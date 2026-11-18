import { useState, useRef } from "react";
import { getDateString } from "#lib/utils";
import SectionHeading from "./SectionHeading";

const ReviewsSection = ({
  reviews,
  isLoading,
  title = "Audience reviews",
  subtitle,
  ref,
  meta,
}: {
  reviews: any[];
  isLoading?: boolean;
  title?: string;
  subtitle?: string;
  ref?: React.RefObject<HTMLDivElement>;
  meta?: string;
}) => {
  const REVIEWS_COLLAPSED = 4;
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(
    new Set(),
  );
  const [showAllReviews, setShowAllReviews] = useState(false);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const targetRef = ref ?? reviewsRef;

  const toggleReview = (reviewId: string) =>
    setExpandedReviews((prev) => {
      const next = new Set(prev);
      if (next.has(reviewId)) next.delete(reviewId);
      else next.add(reviewId);
      return next;
    });

  return (
    <section ref={targetRef} className="scroll-mt-24">
      <SectionHeading title={title} subtitle={subtitle} meta={meta} />

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`animate-pulse rounded-xl border border-white/5 bg-white/[0.03] p-5 ${
                i >= 2 ? "hidden md:block" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-white/10" />
                <div className="flex-1">
                  <div className="h-3 w-28 rounded bg-white/10" />
                  <div className="mt-2 h-2 w-20 rounded bg-white/5" />
                </div>
              </div>
              <div className="mt-5 h-3 w-full rounded bg-white/10" />
              <div className="mt-2 h-3 w-5/6 rounded bg-white/5" />
            </div>
          ))}
        </div>
      ) : reviews.length > 0 ? (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            {reviews.map((review: any, index: number) => {
              const reviewId = String(review.id);
              const isExpanded = expandedReviews.has(reviewId);
              const isLong = (review.content?.length ?? 0) > 280;

              const visibility = showAllReviews
                ? ""
                : index >= REVIEWS_COLLAPSED
                  ? "hidden"
                  : index >= 2
                    ? "hidden md:block"
                    : "";

              return (
                <article
                  key={review.id}
                  className={`rounded-xl border border-white/[0.07] bg-white/[0.03] p-5 transition-colors hover:border-white/15 hover:bg-white/[0.05] ${visibility}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/25 text-sm font-bold uppercase text-white ring-1 ring-primary/40">
                        {review.author?.charAt(0) || "?"}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          {review.author_details?.name || review.author}
                        </p>
                        <p className="mt-0.5 text-[11px] text-white/40">
                          {getDateString(review.created_at)}
                        </p>
                      </div>
                    </div>

                    {review.author_details?.rating != null && (
                      <div className="flex shrink-0 items-center gap-1.5 rounded-md bg-yellow-400/10 px-2.5 py-1.5 text-xs font-bold text-yellow-300">
                        <span aria-hidden>★</span>
                        <span>{review.author_details.rating}/10</span>
                      </div>
                    )}
                  </div>

                  <p
                    className={`mt-4 whitespace-pre-line text-sm leading-6 text-white/65 ${
                      isExpanded ? "" : "line-clamp-5"
                    }`}
                  >
                    {review.content}
                  </p>

                  {isLong && (
                    <button
                      onClick={() => toggleReview(reviewId)}
                      aria-expanded={isExpanded}
                      className="mt-3 text-xs font-semibold text-primary transition hover:brightness-125"
                    >
                      {isExpanded ? "Show less" : "Read full review"}
                    </button>
                  )}
                </article>
              );
            })}
          </div>

          {reviews.length > 2 && (
            <div
              className={`mt-6 flex justify-center ${
                reviews.length <= REVIEWS_COLLAPSED ? "md:hidden" : ""
              }`}
            >
              <button
                onClick={() => {
                  setShowAllReviews((prev) => !prev);
                  if (showAllReviews) {
                    targetRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
                aria-expanded={showAllReviews}
                className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur-md transition hover:border-primary hover:bg-primary/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {showAllReviews
                  ? "Show fewer reviews"
                  : `View all ${reviews.length} reviews`}
                <svg
                  viewBox="0 0 24 24"
                  className={`size-4 fill-none stroke-current transition-transform ${
                    showAllReviews ? "rotate-180" : ""
                  }`}
                  strokeWidth="2.5"
                  aria-hidden
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-xl border border-white/5 bg-white/[0.02] px-5 py-10 text-center">
          <p className="text-sm text-white/50">
            No reviews yet. Be the first to share what you thought after watching.
          </p>
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;
