import { writeFileSync } from "fs";
import { resolve } from "path";

const SITE_URL = "https://deepmovies.example.com";

const staticRoutes = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/movie", changefreq: "daily", priority: 0.9 },
  { path: "/series", changefreq: "daily", priority: 0.9 },
  { path: "/genre", changefreq: "weekly", priority: 0.8 },
  { path: "/search", changefreq: "weekly", priority: 0.5 },
  { path: "/people", changefreq: "daily", priority: 0.9 },
];

const movieCategories = [
  "popular",
  "top-rated",
  "upcoming",
  "now-playing",
];

const seriesCategories = [
  "popular",
  "top-rated",
  "airing-today",
  "airing-this-week",
];

const genreTypes = ["movies", "tv"];

function generateSitemap() {
  const urls = [];

  // Static routes
  for (const route of staticRoutes) {
    urls.push({
      url: `${SITE_URL}${route.path}`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: route.changefreq,
      priority: route.priority,
    });
  }

  // Movie category pages
  for (const cat of movieCategories) {
    urls.push({
      url: `${SITE_URL}/movie?category=${cat}`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "daily",
      priority: 0.8,
    });
  }

  // TV Series category pages
  for (const cat of seriesCategories) {
    urls.push({
      url: `${SITE_URL}/series?category=${cat}`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "daily",
      priority: 0.8,
    });
  }

  // Genre pages
  for (const type of genreTypes) {
    urls.push({
      url: `${SITE_URL}/genre?content_type=${type}`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "weekly",
      priority: 0.7,
    });
  }

  // People pages
  urls.push({
    url: `${SITE_URL}/people`,
    lastmod: new Date().toISOString().split("T")[0],
    changefreq: "daily",
    priority: 0.9,
  });

  // Note: Dynamic routes like /movie/:id, /series/:id, /genre/:name, /people/:id
  // need to be generated from your API data. You can extend this script
  // to fetch from TMDB API and generate those URLs.

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.url}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  const outputPath = resolve("public/sitemap.xml");
  writeFileSync(outputPath, xml);
  console.log(`Sitemap generated at ${outputPath} with ${urls.length} URLs`);
}

generateSitemap();