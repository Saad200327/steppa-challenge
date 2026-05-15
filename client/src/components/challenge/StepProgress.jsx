import StepBar from '../ui/StepBar';

export default function StepProgress({ current, goal }) {
  return (
    <div className="bg-steppa-surface border border-steppa-border rounded-xl p-5">
      <div className="flex justify-between text-sm mb-3">
        <span className="text-steppa-muted">Steps Today</span>
        <span className="font-mono text-white">{current?.toLocaleString()} / {goal?.toLocaleString()}</span>
      </div>
      <StepBar current={current} goal={goal} />
    </div>
  );
}
