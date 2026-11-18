
const SectionHeading = ({
  title,
  subtitle,
  meta,
}: {
  title: string;
  subtitle?: string;
  meta?: string;
}) => (
  <div className="mb-6 flex items-end justify-between gap-4">
    <div className="flex items-stretch gap-3">
      <span className="w-1 rounded-full bg-gradient-to-b from-primary to-primary/0" />
      <div>
        <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-xs text-white/45 sm:text-sm">{subtitle}</p>
        )}
      </div>
    </div>

    {meta && <span className="shrink-0 text-xs text-white/40">{meta}</span>}
  </div>
);

export default SectionHeading;
