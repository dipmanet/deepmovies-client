import { Helmet } from "react-helmet-async";
import { MovieType, TVSeriesType } from "src/lib/datatypes";

interface SEOMetaProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "video.movie" | "video.tv_show" | "video.episode";
  twitterCard?: "summary" | "summary_large_image";
  noIndex?: boolean;
  noFollow?: boolean;
  structuredData?: object;
}

const SITE_URL = "https://deepmovies.example.com";
const SITE_NAME = "DeepMovies";
const DEFAULT_OG_IMAGE = "/og-image.jpg";

export function SEOMeta({
  title = "DeepMovies - Discover Movies & TV Series",
  description = "Explore trending movies, popular TV series, and discover new favorites. Watch trailers, read reviews, and find where to stream.",
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  twitterCard = "summary_large_image",
  noIndex = false,
  noFollow = false,
  structuredData,
}: SEOMetaProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const fullCanonical = canonical ? `${SITE_URL}${canonical}` : SITE_URL;
  const fullOgImage = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;

  const robotsContent = [
    noIndex ? "noindex" : "index",
    noFollow ? "nofollow" : "follow",
    "max-image-preview:large",
    "max-snippet:-1",
    "max-video-preview:-1",
  ].join(", ");

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={fullCanonical} />
      
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      
      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  );
}

interface MovieCredits {
  cast?: { name: string; character: string }[];
  crew?: { job: string; name: string }[];
}

interface MovieVideos {
  results?: { type: string; site: string; key: string }[];
}

interface ExtendedMovieType extends MovieType {
  credits?: MovieCredits;
  videos?: MovieVideos;
}

interface TVSeriesCredits {
  cast?: { name: string; character: string }[];
}

interface ExtendedTVSeriesType extends TVSeriesType {
  credits?: TVSeriesCredits;
}

export function MovieStructuredData(movie: ExtendedMovieType) {
  return {
    "@context": "https://schema.org",
    "@type": "Movie",
    "@id": `${SITE_URL}/movie/${movie.id}`,
    name: movie.title,
    description: movie.overview,
    image: movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : undefined,
    datePublished: movie.release_date,
    genre: movie.genres?.map((g) => g.name) ?? [],
    duration: movie.runtime ? `PT${movie.runtime}M` : undefined,
    aggregateRating: movie.vote_average
      ? {
          "@type": "AggregateRating",
          ratingValue: movie.vote_average / 2,
          reviewCount: movie.vote_count,
          bestRating: 5,
          worstRating: 0.5,
        }
      : undefined,
    director: movie.credits?.crew
      ?.filter((c) => c.job === "Director")
      .map((c) => ({
        "@type": "Person",
        name: c.name,
      })),
    actor: movie.credits?.cast?.slice(0, 10).map((c) => ({
      "@type": "Person",
      name: c.name,
      characterName: c.character,
    })),
    trailer: movie.videos?.results?.find((v) => v.type === "Trailer" && v.site === "YouTube")
      ? `https://www.youtube.com/watch?v=${movie.videos.results.find((v) => v.type === "Trailer" && v.site === "YouTube")?.key}`
      : undefined,
  };
}

export function TVSeriesStructuredData(series: ExtendedTVSeriesType) {
  return {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    "@id": `${SITE_URL}/series/${series.id}`,
    name: series.name,
    description: series.overview,
    image: series.backdrop_path ? `https://image.tmdb.org/t/p/original${series.backdrop_path}` : undefined,
    datePublished: series.first_air_date,
    genre: series.genres?.map((g) => g.name) ?? [],
    numberOfSeasons: series.number_of_seasons,
    numberOfEpisodes: series.number_of_episodes,
    aggregateRating: series.vote_average
      ? {
          "@type": "AggregateRating",
          ratingValue: series.vote_average / 2,
          reviewCount: series.vote_count,
          bestRating: 5,
          worstRating: 0.5,
        }
      : undefined,
    actor: series.credits?.cast?.slice(0, 10).map((c) => ({
      "@type": "Person",
      name: c.name,
      characterName: c.character,
    })),
    containsSeason: series.seasons?.map((s) => ({
      "@type": "TVSeason",
      seasonNumber: s.season_number,
      episodeCount: s.episode_count,
    })),
  };
}

export function BreadcrumbStructuredData(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}