import { cn } from "@/lib/utils";

/** Official Maatri brand mark (cupped hands holding baby feet). */
export function MaatriMark({ className }: { className?: string }) {
  return (
    <img
      src="/maatri-mark.png"
      alt="Maatri logo"
      className={cn("h-8 w-8 object-contain", className)}
      loading="eager"
      decoding="async"
    />
  );
}

/** Full circular Maatri lockup with the wordmark. */
export function MaatriLogo({ className }: { className?: string }) {
  return (
    <img
      src="/maatri-logo.png"
      alt="Maatri"
      className={cn("h-32 w-32 object-contain", className)}
      loading="eager"
      decoding="async"
    />
  );
}
