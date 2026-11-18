/* Inline SVG film grain – no extra network request */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")";

const HeroOverlays = () => (
  <>
    <div className="absolute inset-0 bg-[#191936]/45 mix-blend-multiply" />
    <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-transparent to-indigo-900/40 mix-blend-soft-light" />
    <div className="absolute inset-0 bg-[linear-gradient(95deg,#12122a_0%,rgba(18,18,42,0.88)_28%,rgba(25,25,54,0.35)_62%,rgba(25,25,54,0.1)_100%)]" />
    <div className="absolute -bottom-32 -left-24 size-[640px] rounded-full bg-primary/25 blur-[140px]" />
    <div className="absolute -right-24 -top-24 size-[460px] rounded-full bg-sky-400/15 blur-[130px]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(8,8,22,0.65)_100%)]" />
    <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#0c0c1e]/80 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#191936] via-[#191936]/85 to-transparent" />
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
      style={{ backgroundImage: GRAIN }}
    />
  </>
);

export default HeroOverlays;
