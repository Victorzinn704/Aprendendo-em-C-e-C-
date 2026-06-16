type MetricProps = {
  label: string;
  value: string;
  tone: 'success' | 'warning' | 'info';
};

export function Metric({ label, value, tone }: MetricProps) {
  return (
    <div className={`metric metric--${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
