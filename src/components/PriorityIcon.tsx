import type { Priority } from "../types";

const CONFIGS: Record<Priority, { fills: [string, string, string] }> = {
  high: { fills: ["#f97316", "#f97316", "#f97316"] },
  medium: { fills: ["#f97316", "#f97316", "#2d2d2d"] },
  low: { fills: ["#f97316", "#2d2d2d", "#2d2d2d"] },
};

export default function PriorityIcon({ priority }: { priority: Priority }) {
  const { fills } = CONFIGS[priority];
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="flex-shrink-0"
    >
      <rect x="1" y="9" width="3" height="4" rx="0.5" fill={fills[0]} />
      <rect x="5.5" y="5.5" width="3" height="7.5" rx="0.5" fill={fills[1]} />
      <rect x="10" y="2" width="3" height="11" rx="0.5" fill={fills[2]} />
    </svg>
  );
}
