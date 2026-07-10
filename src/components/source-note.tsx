export function SourceNote({ source }: { source: string }) {
  return (
    <p className="mt-2 text-[11px] italic text-muted-foreground">Source: {source}</p>
  );
}
