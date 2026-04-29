import * as React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile-shell";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { COMMUNITY_TOPICS, REPORT_REASONS } from "@/lib/community";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ArrowUp, Flag, Trash2 } from "lucide-react";
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

type Reply = {
  id: string;
  post_id: string;
  user_id: string;
  body: string;
  anonymous: boolean;
  display_name: string | null;
  created_at: string;
};

export const Route = createFileRoute("/community/$postId")({
  component: PostPage,
});

function PostPage() {
  const { postId } = Route.useParams();
  const { t } = useI18n();
  const { user, loading } = useAuth();
  const nav = useNavigate();

  const [post, setPost] = React.useState<Post | null>(null);
  const [replies, setReplies] = React.useState<Reply[]>([]);
  const [voted, setVoted] = React.useState(false);
  const [body, setBody] = React.useState("");
  const [anon, setAnon] = React.useState(true);
  const [sending, setSending] = React.useState(false);

  React.useEffect(() => {
    if (!loading && !user) nav({ to: "/login" });
  }, [loading, user, nav]);

  const load = React.useCallback(async () => {
    const [{ data: p }, { data: r }, { data: v }] = await Promise.all([
      supabase.from("community_posts").select("*").eq("id", postId).maybeSingle(),
      supabase.from("community_replies").select("*").eq("post_id", postId).eq("hidden", false).order("created_at"),
      user ? supabase.from("post_votes").select("post_id").eq("post_id", postId).eq("user_id", user.id).maybeSingle() : Promise.resolve({ data: null }),
    ]);
    setPost((p as Post) ?? null);
    setReplies((r as Reply[]) ?? []);
    setVoted(!!v);
  }, [postId, user]);

  React.useEffect(() => { if (user) void load(); }, [user, load]);

  const toggleVote = async () => {
    if (!user || !post) return;
    if (voted) {
      const { error } = await supabase.from("post_votes").delete().eq("post_id", post.id).eq("user_id", user.id);
      if (!error) {
        setVoted(false);
        setPost({ ...post, vote_count: Math.max(post.vote_count - 1, 0) });
      }
    } else {
      const { error } = await supabase.from("post_votes").insert({ post_id: post.id, user_id: user.id });
      if (!error) {
        setVoted(true);
        setPost({ ...post, vote_count: post.vote_count + 1 });
      }
    }
  };

  const sendReply = async () => {
    if (!user || !post || !body.trim()) return;
    setSending(true);
    const { error } = await supabase.from("community_replies").insert({
      post_id: post.id,
      user_id: user.id,
      body: body.trim(),
      anonymous: anon,
    });
    setSending(false);
    if (error) { toast.error(error.message); return; }
    setBody("");
    void load();
  };

  const deletePost = async () => {
    if (!post) return;
    const { error } = await supabase.from("community_posts").delete().eq("id", post.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted");
    nav({ to: "/community" });
  };

  if (!post) {
    return (
      <MobileShell>
        <div className="px-5 pt-8 text-sm text-muted-foreground">{t("loading")}</div>
      </MobileShell>
    );
  }

  const topic = COMMUNITY_TOPICS.find((x) => x.id === post.topic);
  const author = post.anonymous ? t("anonymous") : post.display_name || t("anonymous");
  const isOwner = user?.id === post.user_id;

  return (
    <MobileShell>
      <div className="px-5 pb-8 pt-6">
        <Link to="/community" className="mb-3 inline-flex items-center gap-1 text-sm text-muted-foreground">
          <ChevronLeft className="h-4 w-4" /> {t("back")}
        </Link>

        <article className="rounded-2xl bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <span>{topic?.emoji} {topic?.label ?? post.topic}</span>
            <span>·</span>
            <span>{t("by")} {author}</span>
            <span>·</span>
            <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
          </div>
          <h1 className="mt-2 font-display text-xl leading-snug">{post.title}</h1>
          <p className="mt-2 whitespace-pre-wrap text-sm text-foreground">{post.body}</p>

          <div className="mt-4 flex items-center gap-2">
            <Button
              size="sm"
              variant={voted ? "default" : "outline"}
              onClick={toggleVote}
              className="rounded-full"
            >
              <ArrowUp className="h-4 w-4" /> {post.vote_count}
            </Button>
            <ReportDialog postId={post.id} />
            {isOwner && (
              <Button size="sm" variant="ghost" onClick={deletePost} className="ml-auto text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </article>

        {/* Replies */}
        <h2 className="mb-2 mt-6 text-sm font-medium text-muted-foreground">
          {replies.length} {t("replies")}
        </h2>
        <div className="space-y-2">
          {replies.map((r) => {
            const rAuthor = r.anonymous ? t("anonymous") : r.display_name || t("anonymous");
            return (
              <div key={r.id} className="rounded-2xl bg-card p-3 shadow-sm">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{t("by")} {rAuthor} · {formatDistanceToNow(new Date(r.created_at), { addSuffix: true })}</span>
                  <ReportDialog replyId={r.id} compact />
                </div>
                <p className="mt-1.5 whitespace-pre-wrap text-sm">{r.body}</p>
              </div>
            );
          })}
        </div>

        {/* Reply box */}
        <div className="mt-6 rounded-2xl bg-card p-4 shadow-sm">
          <Label htmlFor="reply" className="text-sm font-medium">{t("reply")}</Label>
          <Textarea id="reply" rows={3} value={body} onChange={(e) => setBody(e.target.value)} maxLength={1000} className="mt-2" />
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Switch id="r-anon" checked={anon} onCheckedChange={setAnon} />
              <Label htmlFor="r-anon" className="text-xs">{t("post_anonymously")}</Label>
            </div>
            <Button size="sm" disabled={sending || !body.trim()} onClick={sendReply} className="rounded-full">
              {t("post")}
            </Button>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}

function ReportDialog({ postId, replyId, compact }: { postId?: string; replyId?: string; compact?: boolean }) {
  const { t } = useI18n();
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [reason, setReason] = React.useState(REPORT_REASONS[0]);
  const [sending, setSending] = React.useState(false);

  const submit = async () => {
    if (!user) return;
    setSending(true);
    const { error } = await supabase.from("reports").insert({
      reporter_id: user.id,
      post_id: postId ?? null,
      reply_id: replyId ?? null,
      reason,
    });
    setSending(false);
    if (error) { toast.error(error.message); return; }
    toast.success(t("reported"));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={compact ? "sm" : "sm"} variant="ghost" className={compact ? "h-7 px-2 text-muted-foreground" : "rounded-full"}>
          <Flag className="h-3.5 w-3.5" /> {!compact && t("report")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{t("report_reason")}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {REPORT_REASONS.map((r) => (
            <button
              key={r}
              onClick={() => setReason(r)}
              className={`w-full rounded-xl px-3 py-2 text-left text-sm ${
                reason === r ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              }`}
            >
              {r}
            </button>
          ))}
          <Button onClick={submit} disabled={sending} className="mt-2 h-11 w-full rounded-full">
            {sending ? t("loading") : t("report")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
