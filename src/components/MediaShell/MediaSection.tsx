import SectionHeading from "./SectionHeading";

const MediaSection = ({
  title,
  subtitle,
  meta,
  className,
  children,
}: {
  title?: string;
  subtitle?: string;
  meta?: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <section className={className ?? ""}>
      {title && <SectionHeading title={title} subtitle={subtitle} meta={meta} />}
      {children}
    </section>
  );
};

export default MediaSection;
