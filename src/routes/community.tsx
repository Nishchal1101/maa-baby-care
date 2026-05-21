import * as React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile-shell";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { COMMUNITY_TOPICS, type TopicId } from "@/lib/community";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, MessageCircle, Plus, ArrowUp } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

type Post = {
  id: string;
  user_id: string;
  topic: string;
  title: string;
  body: string;
  anonymous: boolean;
  display_name: string | null;
  vote_count: number;
  reply_count: number;
  created_at: string;
};

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — MatruCare" },
      { name: "description", content: "Ask questions and connect with other Indian mothers — anonymously if you wish. Topics: nutrition, symptoms, labor, newborn care, mental health." },
    ],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  const { t } = useI18n();
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [topic, setTopic] = React.useState<TopicId | "all">("all");
  const [posts, setPosts] = React.useState<Post[] | null>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!loading && !user) nav({ to: "/login" });
  }, [loading, user, nav]);

  const load = React.useCallback(async () => {
    let q = supabase.from("community_posts").select("*").eq("hidden", false).order("created_at", { ascending: false }).limit(50);
    if (topic !== "all") q = q.eq("topic", topic);
    const { data } = await q;
    setPosts((data as Post[]) ?? []);
  }, [topic]);

  React.useEffect(() => { void load(); }, [load]);

  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-6">
        <Link to="/more" className="mb-3 inline-flex items-center gap-1 text-sm text-muted-foreground">
          <ChevronLeft className="h-4 w-4" /> {t("back")}
        </Link>
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <MessageCircle className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <h1 className="font-display text-2xl leading-tight">{t("community")}</h1>
              <p className="text-xs text-muted-foreground break-words">{t("community_intro")}</p>
            </div>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="rounded-full"><Plus className="h-4 w-4" /></Button>
            </DialogTrigger>
            <NewPostDialog onClose={() => { setOpen(false); void load(); }} />
          </Dialog>
        </div>

        {/* Topic filter */}
        <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
          <Chip active={topic === "all"} onClick={() => setTopic("all")}>🌐 {t("all_topics")}</Chip>
          {COMMUNITY_TOPICS.map((tp) => (
            <Chip key={tp.id} active={topic === tp.id} onClick={() => setTopic(tp.id as TopicId)}>
              {tp.emoji} {tp.label}
            </Chip>
          ))}
        </div>

        {/* Posts */}
        <div className="mt-4 space-y-2">
          {posts === null ? (
            <p className="py-8 text-center text-sm text-muted-foreground">{t("loading")}</p>
          ) : posts.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">{t("no_posts")}</p>
          ) : (
            posts.map((p) => <PostCard key={p.id} post={p} />)
          )}
        </div>
      </div>
    </MobileShell>
  );
}

function Chip({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full px-3 py-1.5 text-xs transition ${
        active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function PostCard({ post }: { post: Post }) {
  const { t } = useI18n();
  const topic = COMMUNITY_TOPICS.find((x) => x.id === post.topic);
  const author = post.anonymous ? t("anonymous") : post.display_name || t("anonymous");
  return (
    <Link
      to="/community/$postId"
      params={{ postId: post.id }}
      className="block rounded-2xl bg-card p-4 shadow-sm active:scale-[0.99]"
    >
      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] text-muted-foreground">
        <span className="truncate max-w-[40%]">{topic?.emoji} {topic?.label ?? post.topic}</span>
        <span>·</span>
        <span className="truncate max-w-[35%]">{t("by")} {author}</span>
        <span>·</span>
        <span className="truncate">{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
      </div>
      <h3 className="mt-1.5 font-medium leading-snug break-words">{post.title}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground break-words">{post.body}</p>
      <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1"><ArrowUp className="h-3.5 w-3.5" /> {post.vote_count}</span>
        <span className="inline-flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" /> {post.reply_count}</span>
      </div>
    </Link>
  );
}

function NewPostDialog({ onClose }: { onClose: () => void }) {
  const { t } = useI18n();
  const { user, profile } = useAuth();
  const [topic, setTopic] = React.useState<TopicId>("general");
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [anonymous, setAnonymous] = React.useState(true);
  const [displayName, setDisplayName] = React.useState(profile?.name ?? "");
  const [saving, setSaving] = React.useState(false);

  const submit = async () => {
    if (!user) return;
    if (!title.trim() || !body.trim()) {
      toast.error("Please fill title and message");
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("community_posts").insert({
      user_id: user.id,
      topic,
      title: title.trim(),
      body: body.trim(),
      anonymous,
      display_name: anonymous ? null : (displayName.trim() || null),
    });
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Posted!");
    onClose();
  };

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>{t("ask_question")}</DialogTitle>
      </DialogHeader>
      <div className="space-y-3">
        <div>
          <Label className="text-xs">{t("topics")}</Label>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {COMMUNITY_TOPICS.map((tp) => (
              <button
                key={tp.id}
                type="button"
                onClick={() => setTopic(tp.id as TopicId)}
                className={`rounded-full px-2.5 py-1 text-xs ${
                  topic === tp.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {tp.emoji} {tp.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="title" className="text-xs">{t("title_label")}</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={140} />
        </div>
        <div>
          <Label htmlFor="body" className="text-xs">{t("body_label")}</Label>
          <Textarea id="body" rows={5} value={body} onChange={(e) => setBody(e.target.value)} maxLength={2000} />
        </div>
        <div className="flex items-center justify-between rounded-xl bg-muted/40 p-3">
          <Label htmlFor="anon" className="text-sm">{t("post_anonymously")}</Label>
          <Switch id="anon" checked={anonymous} onCheckedChange={setAnonymous} />
        </div>
        {!anonymous && (
          <div>
            <Label htmlFor="dn" className="text-xs">{t("display_name")}</Label>
            <Input id="dn" value={displayName} onChange={(e) => setDisplayName(e.target.value)} maxLength={40} />
          </div>
        )}
        <Button onClick={submit} disabled={saving} className="h-11 w-full rounded-full">
          {saving ? t("loading") : t("post")}
        </Button>
      </div>
    </DialogContent>
  );
}
