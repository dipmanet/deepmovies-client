import { GenreType } from "#lib/datatypes";
import { cn } from "#lib/utils";
import { Link } from "react-router-dom";
import {
  FaBolt,
  FaCameraRetro,
  FaChild,
  FaCompass,
  FaCrosshairs,
  FaFaceLaugh,
  FaFlag,
  FaGavel,
  FaGhost,
  FaHatCowboy,
  FaHatWizard,
  FaHeart,
  FaHouse,
  FaLandmark,
  FaMagnifyingGlass,
  FaMasksTheater,
  FaMicrophoneLines,
  FaMountain,
  FaMusic,
  FaNewspaper,
  FaPeopleGroup,
  FaPuzzlePiece,
  FaRocket,
  FaSatelliteDish,
  FaScroll,
  FaShieldHalved,
  FaSkullCrossbones,
  FaTv,
  FaVideo,
  FaWandMagicSparkles,
} from "react-icons/fa6";

type GenreTheme = {
  from: string;
  via: string;
  to: string;
  accent: string;
  glow: string;
};

const GENRE_THEMES: Record<string, GenreTheme> = {
  action: {
    from: "from-rose-500",
    via: "via-red-600",
    to: "to-orange-700",
    accent: "text-rose-200",
    glow: "shadow-rose-500/40",
  },
  adventure: {
    from: "from-emerald-500",
    via: "via-teal-600",
    to: "to-cyan-700",
    accent: "text-emerald-200",
    glow: "shadow-emerald-500/40",
  },
  animation: {
    from: "from-fuchsia-500",
    via: "via-pink-600",
    to: "to-purple-700",
    accent: "text-fuchsia-200",
    glow: "shadow-fuchsia-500/40",
  },
  comedy: {
    from: "from-amber-400",
    via: "via-yellow-500",
    to: "to-orange-600",
    accent: "text-amber-100",
    glow: "shadow-amber-500/40",
  },
  crime: {
    from: "from-slate-500",
    via: "via-zinc-600",
    to: "to-neutral-800",
    accent: "text-slate-200",
    glow: "shadow-slate-500/40",
  },
  documentary: {
    from: "from-sky-500",
    via: "via-blue-600",
    to: "to-indigo-700",
    accent: "text-sky-200",
    glow: "shadow-sky-500/40",
  },
  drama: {
    from: "from-violet-500",
    via: "via-purple-600",
    to: "to-fuchsia-700",
    accent: "text-violet-200",
    glow: "shadow-violet-500/40",
  },
  family: {
    from: "from-lime-500",
    via: "via-green-600",
    to: "to-emerald-700",
    accent: "text-lime-200",
    glow: "shadow-lime-500/40",
  },
  fantasy: {
    from: "from-indigo-500",
    via: "via-violet-600",
    to: "to-purple-800",
    accent: "text-indigo-200",
    glow: "shadow-indigo-500/40",
  },
  history: {
    from: "from-amber-600",
    via: "via-yellow-700",
    to: "to-amber-900",
    accent: "text-amber-200",
    glow: "shadow-amber-600/40",
  },
  horror: {
    from: "from-red-700",
    via: "via-red-900",
    to: "to-neutral-950",
    accent: "text-red-200",
    glow: "shadow-red-700/40",
  },
  music: {
    from: "from-pink-500",
    via: "via-rose-600",
    to: "to-fuchsia-700",
    accent: "text-pink-200",
    glow: "shadow-pink-500/40",
  },
  mystery: {
    from: "from-cyan-600",
    via: "via-teal-700",
    to: "to-slate-800",
    accent: "text-cyan-200",
    glow: "shadow-cyan-600/40",
  },
  romance: {
    from: "from-pink-400",
    via: "via-rose-500",
    to: "to-red-600",
    accent: "text-pink-100",
    glow: "shadow-pink-400/40",
  },
  "science fiction": {
    from: "from-blue-500",
    via: "via-cyan-600",
    to: "to-teal-700",
    accent: "text-blue-200",
    glow: "shadow-blue-500/40",
  },
  "sci-fi": {
    from: "from-blue-500",
    via: "via-cyan-600",
    to: "to-teal-700",
    accent: "text-blue-200",
    glow: "shadow-blue-500/40",
  },
  "tv movie": {
    from: "from-zinc-500",
    via: "via-slate-600",
    to: "to-zinc-800",
    accent: "text-zinc-200",
    glow: "shadow-zinc-500/40",
  },
  thriller: {
    from: "from-orange-600",
    via: "via-red-700",
    to: "to-rose-800",
    accent: "text-orange-200",
    glow: "shadow-orange-600/40",
  },
  war: {
    from: "from-stone-600",
    via: "via-amber-800",
    to: "to-stone-900",
    accent: "text-stone-200",
    glow: "shadow-stone-600/40",
  },
  western: {
    from: "from-yellow-600",
    via: "via-amber-700",
    to: "to-orange-800",
    accent: "text-yellow-200",
    glow: "shadow-yellow-600/40",
  },
  kids: {
    from: "from-yellow-400",
    via: "via-orange-500",
    to: "to-pink-500",
    accent: "text-yellow-100",
    glow: "shadow-yellow-400/40",
  },
  news: {
    from: "from-blue-600",
    via: "via-indigo-700",
    to: "to-slate-800",
    accent: "text-blue-200",
    glow: "shadow-blue-600/40",
  },
  reality: {
    from: "from-purple-500",
    via: "via-fuchsia-600",
    to: "to-pink-700",
    accent: "text-purple-200",
    glow: "shadow-purple-500/40",
  },
  soap: {
    from: "from-rose-400",
    via: "via-pink-500",
    to: "to-purple-600",
    accent: "text-rose-100",
    glow: "shadow-rose-400/40",
  },
  talk: {
    from: "from-teal-500",
    via: "via-cyan-600",
    to: "to-blue-700",
    accent: "text-teal-200",
    glow: "shadow-teal-500/40",
  },
  "war & politics": {
    from: "from-stone-600",
    via: "via-amber-800",
    to: "to-stone-900",
    accent: "text-stone-200",
    glow: "shadow-stone-600/40",
  },
};

const FALLBACK_THEMES: GenreTheme[] = [
  {
    from: "from-rose-500",
    via: "via-fuchsia-600",
    to: "to-purple-700",
    accent: "text-rose-200",
    glow: "shadow-rose-500/40",
  },
  {
    from: "from-sky-500",
    via: "via-blue-600",
    to: "to-indigo-700",
    accent: "text-sky-200",
    glow: "shadow-sky-500/40",
  },
  {
    from: "from-emerald-500",
    via: "via-teal-600",
    to: "to-cyan-700",
    accent: "text-emerald-200",
    glow: "shadow-emerald-500/40",
  },
  {
    from: "from-amber-500",
    via: "via-orange-600",
    to: "to-red-700",
    accent: "text-amber-200",
    glow: "shadow-amber-500/40",
  },
];

const GENRE_ICONS: Record<string, typeof FaBolt> = {
  action: FaBolt,
  adventure: FaMountain,
  animation: FaWandMagicSparkles,
  comedy: FaFaceLaugh,
  crime: FaGavel,
  documentary: FaCameraRetro,
  drama: FaMasksTheater,
  family: FaHouse,
  fantasy: FaHatWizard,
  history: FaLandmark,
  horror: FaGhost,
  music: FaMusic,
  mystery: FaMagnifyingGlass,
  romance: FaHeart,
  "science fiction": FaRocket,
  "sci-fi": FaSatelliteDish,
  "tv movie": FaTv,
  thriller: FaCrosshairs,
  war: FaShieldHalved,
  western: FaHatCowboy,
  kids: FaChild,
  news: FaNewspaper,
  reality: FaPeopleGroup,
  soap: FaHeart,
  talk: FaMicrophoneLines,
  "war & politics": FaFlag,
};

const GenreCard = ({
  genre,
  contentType,
  className,
}: {
  genre: GenreType;
  contentType: string;
  className?: string;
}) => {
  const slug = genre.name.toLowerCase().replaceAll(" ", "_");
  const href = `/genre/${slug}/?content_type=${contentType}`;

  const key = genre.name.toLowerCase();
  const Icon = GENRE_ICONS[key] ?? FaBolt;
  const theme =
    GENRE_THEMES[key] ?? FALLBACK_THEMES[genre.id % FALLBACK_THEMES.length];

  return (
    <Link
      to={href}
      className={cn(
        "group relative flex aspect-[16/10] flex-col justify-between overflow-hidden rounded-xl p-4 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:ring-white/20 hover:shadow-lg",
        theme.glow,
        className ?? "",
      )}
    >
      {/* vibrant gradient background */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-110",
          theme.from,
          theme.via,
          theme.to,
        )}
      />
      {/* soft dark overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      {/* decorative dot pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:14px_14px]"
      />
      {/* large watermark icon */}
      <div className="pointer-events-none absolute -bottom-3 -right-3 text-white/[0.08] transition-transform duration-500 group-hover:scale-110 group-hover:text-white/[0.12]">
        <Icon className="size-28" />
      </div>

      {/* icon badge */}
      <div className="relative flex items-start justify-between">
        <div
          className={cn(
            "flex size-10 items-center justify-center rounded-xl bg-white/20 text-white shadow-inner backdrop-blur-md transition-transform duration-300 group-hover:scale-110",
          )}
        >
          <Icon className="size-5" />
        </div>
        <span className="rounded-full bg-black/25 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/80 backdrop-blur-sm">
          Browse
        </span>
      </div>

      <div className="relative">
        <h3
          className={cn(
            "text-[15px] font-bold leading-tight drop-shadow-sm",
            theme.accent,
          )}
        >
          {genre.name}
        </h3>
      </div>
    </Link>
  );
};

export default GenreCard;
