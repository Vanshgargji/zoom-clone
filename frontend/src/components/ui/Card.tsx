import clsx from "clsx";
import type { ComponentProps } from "react";

/** The white, softly shadowed panel that every dashboard section sits on. */
export function Card({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={clsx("rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100/50", className)}
      {...props}
    />
  );
}
