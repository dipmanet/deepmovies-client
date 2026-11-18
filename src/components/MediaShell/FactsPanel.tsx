import { cn } from "#lib/utils";
import Fact from "./Fact";

const FactsPanel = ({
  facts,
  className,
}: {
  facts: { label: string; value: string }[];
  className?: string;
}) => {
  return (
    <section
      aria-label="facts"
      className={cn(
        "relative z-20 -mt-6 grid grid-cols-2 gap-x-8 gap-y-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:grid-cols-3 sm:p-6 lg:grid-cols-4",
        className ?? "",
      )}
    >
      {facts.map((fact, index) => (
        <Fact key={index} label={fact.label} value={fact.value} />
      ))}
    </section>
  );
};

export default FactsPanel;
