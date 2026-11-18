// import { getImageUrl } from "#lib/utils";

// const EpisodeCard = ({
//   episode,
//   seriesId,
// }: {
//   episode: {
//     air_date: string;
//     episode_number: number;
//     id: number;
//     name: string;
//     overview: string;
//     runtime: number;
//     season_number: number;
//     show_id: number;
//     still_path: string;
//     vote_average: number;
//     vote_count: number;
//   };
//   seriesId: number;
// }) => {
//   const stillUrl = getImageUrl(episode.still_path, "w300");
//   const airDate = episode.air_date
//     ? new Date(episode.air_date).toLocaleDateString("en-GB", {
//         day: "numeric",
//         month: "short",
//         year: "numeric",
//       })
//     : "TBA";
//   const rating = episode.vote_average?.toFixed(1) ?? "N/A";

//   return (
//     <Link
//       to={`/series/${seriesId}/season/${episode.season_number}/episode/${episode.episode_number}`}
//       className="group flex flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] transition-all duration-200 hover:border-primary/30 hover:bg-white/[0.06]"
//     >
//       {/* Thumbnail */}
//       <div className="relative aspect-video w-full overflow-hidden bg-[#0e0e28]">
//         {stillUrl ? (
//           <img
//             src={stillUrl}
//             alt={episode.name}
//             loading="lazy"
//             draggable={false}
//             className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
//           />
//         ) : (
//           <div className="flex h-full w-full items-center justify-center">
//             <PlayIcon className="size-8 text-white/20" />
//           </div>
//         )}

//         {/* Gradient + play overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
//         <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
//           <div className="flex size-11 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white shadow-lg backdrop-blur-md transition group-hover:scale-110 group-hover:border-primary group-hover:bg-primary">
//             <PlayIcon className="ml-0.5 size-5" />
//           </div>
//         </div>

//         {/* Episode number badge */}
//         <span className="absolute left-2.5 top-2.5 rounded-md bg-black/60 px-2 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
//           EP {episode.episode_number}
//         </span>

//         {/* Rating */}
//         <div className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-[11px] font-bold text-yellow-400 backdrop-blur-sm">
//           <svg viewBox="0 0 20 20" className="size-3 fill-current" aria-hidden>
//             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69z" />
//           </svg>
//           {rating}
//         </div>

//         {/* Runtime badge */}
//         {episode.runtime > 0 && (
//           <span className="absolute bottom-2.5 right-2.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur-sm">
//             {episode.runtime}m
//           </span>
//         )}
//       </div>

//       {/* Info */}
//       <div className="flex flex-1 flex-col p-3">
//         <h4 className="line-clamp-1 text-[13px] font-semibold text-white">
//           {episode.name}
//         </h4>
//         <p className="mt-1 text-[11px] text-white/40">{airDate}</p>
//         {episode.overview && (
//           <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-white/50">
//             {episode.overview}
//           </p>
//         )}
//       </div>
//     </Link>
//   );
// };
