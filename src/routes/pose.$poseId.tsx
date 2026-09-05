import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile-shell";
import { BackButton } from "@/components/back-button";
import { yogaPoses } from "@/lib/yoga";
import { yogaImages } from "@/lib/yoga-images";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";

export const Route = createFileRoute("/pose/$poseId")({
  head: ({ params }) => {
    const pose = yogaPoses.find((p) => p.id === params.poseId);
    const title = pose ? `${pose.name}  -  Maatri` : "Yoga pose  -  Maatri";
    const description = pose
      ? `${pose.benefits} Step-by-step prenatal guidance for ${pose.name}.`
      : "Prenatal yoga pose guidance for Indian mothers.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  loader: ({ params }) => {
    const index = yogaPoses.findIndex((p) => p.id === params.poseId);
    if (index === -1) throw notFound();
    return { index };
  },
  errorComponent: () => <PoseMissing />,
  notFoundComponent: () => <PoseMissing />,
  component: PoseDetail,
});

function PoseMissing() {
  return (
    <MobileShell>
      <div className="px-5 py-10 text-center">
        <p className="text-sm text-muted-foreground">This pose could not be found.</p>
        <Link to="/yoga" className="mt-3 inline-block text-sm font-medium text-primary">
          Back to yoga
        </Link>
      </div>
    </MobileShell>
  );
}

function PoseDetail() {
  const { poseId } = Route.useParams();
  const index = yogaPoses.findIndex((p) => p.id === poseId);
  const pose = yogaPoses[index];
  if (!pose) return <PoseMissing />;

  const prev = index > 0 ? yogaPoses[index - 1] : null;
  const next = index < yogaPoses.length - 1 ? yogaPoses[index + 1] : null;
  const image = yogaImages[pose.id];

  return (
    <MobileShell>
      <div className="flex min-h-[100dvh] flex-col">
        <div className="flex items-center justify-between px-3 pt-3">
          <BackButton />
          <span className="pr-2 text-xs text-muted-foreground">
            {index + 1} / {yogaPoses.length}
          </span>
        </div>

        {/* Upper half: full image (never cropped)  -  tap to zoom */}
        <div className="mt-2 h-[45dvh] shrink-0 px-4">
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                aria-label={`View full ${pose.name} guide image`}
                className="relative h-full w-full overflow-hidden rounded-lg bg-muted shadow-sm"
              >
                {image ? (
                  <img
                    src={image}
                    alt={`${pose.name} prenatal yoga pose guide`}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                ) : null}
                <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-medium text-foreground shadow-sm">
                  <Expand className="h-3 w-3" /> Tap to zoom
                </span>
              </button>
            </DialogTrigger>
            <DialogContent className="flex h-[90dvh] max-w-full flex-col gap-0 overflow-hidden p-2 [&>button]:z-10">
              <div className="h-full w-full overflow-auto">
                {image ? (
                  <img
                    src={image}
                    alt={`${pose.name} full step-by-step guide`}
                    className="mx-auto w-full min-w-[200%] max-w-none"
                  />
                ) : null}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Lower half: steps */}
        <div className="mt-3 flex-1 overflow-y-auto px-5 pb-4">
          <h1 className="font-display text-xl leading-tight">{pose.name}</h1>
          {pose.nameHi ? <p className="text-xs text-muted-foreground">{pose.nameHi}</p> : null}
          <div className="mt-2 flex flex-wrap gap-1">
            {pose.trimester.map((tr) => (
              <Badge key={tr} variant="secondary" className="text-[10px]">T{tr}</Badge>
            ))}
            <Badge variant="outline" className="text-[10px]">{pose.duration}</Badge>
          </div>

          <p className="mt-3 text-sm text-muted-foreground">
            <strong className="text-foreground">Benefits:</strong> {pose.benefits}
          </p>

          <p className="mt-4 text-sm font-medium">Steps</p>
          <ol className="mt-1 list-decimal space-y-1.5 pl-5 text-sm text-muted-foreground">
            {pose.steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>

        {/* Navigation */}
        <div className="sticky bottom-0 flex gap-3 border-t border-border bg-background/95 px-5 py-3 backdrop-blur">
          {prev ? (
            <Link
              to="/pose/$poseId"
              params={{ poseId: prev.id }}
              className="flex h-11 flex-1 items-center justify-center gap-1 rounded-full bg-muted text-sm font-medium"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Link>
          ) : (
            <span className="flex h-11 flex-1 items-center justify-center rounded-full bg-muted/50 text-sm text-muted-foreground">
              Previous
            </span>
          )}
          {next ? (
            <Link
              to="/pose/$poseId"
              params={{ poseId: next.id }}
              className="flex h-11 flex-1 items-center justify-center gap-1 rounded-full bg-primary text-sm font-medium text-primary-foreground"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <span className="flex h-11 flex-1 items-center justify-center rounded-full bg-muted/50 text-sm text-muted-foreground">
              Next
            </span>
          )}
        </div>
      </div>
    </MobileShell>
  );
}
