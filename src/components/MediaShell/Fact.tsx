const Fact = ({ label, value }: { label: string; value: string }) => (
  <div className="min-w-0">
    <p className="text-[11px] text-white/40">{label}</p>
    <p
      className="mt-1 truncate text-sm font-medium text-white/90"
      title={value}
    >
      {value}
    </p>
  </div>
);

export default Fact;
