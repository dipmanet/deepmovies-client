import { cn } from "#lib/utils";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";

const MediaPagination = ({
  page,
  pageCount,
  onPageChange,
  className,
}: {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
}) => {
  if (pageCount <= 1) return null;

  // TMDB caps results at 500 pages; clamp to avoid 400 errors
  const total = Math.min(pageCount, 500);
  const current = Math.min(page, total);

  // Build a window of page numbers around the current page
  const pages: (number | "ellipsis")[] = [];

  const add = (n: number) => pages.push(n);
  const ellipsis = () => pages.push("ellipsis");

  if (total <= 7) {
    for (let i = 1; i <= total; i++) add(i);
  } else {
    add(1);
    if (current > 3) ellipsis();
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) add(i);
    if (current < total - 2) ellipsis();
    add(total);
  }

  const btn =
    "flex size-9 items-center justify-center rounded-lg text-[13px] font-medium transition-all duration-200 ease-in-out";
  const idle =
    "text-muted-foreground hover:text-foreground hover:bg-white/[0.06]";
  const active = "bg-primary text-white shadow-sm";

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-1.5",
        className ?? "",
      )}
    >
      <button
        type="button"
        disabled={current <= 1}
        onClick={() => onPageChange(current - 1)}
        className={cn(
          btn,
          idle,
          current <= 1 ? "pointer-events-none opacity-30" : "",
        )}
        aria-label="Previous page"
      >
        <HiOutlineChevronLeft className="size-4" />
      </button>

      {pages.map((p, i) =>
        p === "ellipsis" ? (
          <span
            key={`e-${i}`}
            className="flex size-9 items-center justify-center text-sm text-muted-foreground"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={cn(btn, p === current ? active : idle)}
            aria-current={p === current ? "page" : undefined}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        disabled={current >= total}
        onClick={() => onPageChange(current + 1)}
        className={cn(
          btn,
          idle,
          current >= total ? "pointer-events-none opacity-30" : "",
        )}
        aria-label="Next page"
      >
        <HiOutlineChevronRight className="size-4" />
      </button>
    </div>
  );
};

export default MediaPagination;