import type { Status } from "../types";

export default function StatusIcon({
  status,
  size = 14,
}: {
  status: Status;
  size?: number;
}) {
  if (status === "pending") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 14 14"
        fill="none"
        className="flex-shrink-0"
      >
        <circle
          cx="7"
          cy="7"
          r="5.5"
          stroke="#4b5563"
          strokeWidth="1.5"
          strokeDasharray="2.5 1.8"
        />
      </svg>
    );
  }

  if (status === "in-review") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 14 14"
        fill="none"
        className="flex-shrink-0"
      >
        <circle cx="7" cy="7" r="6" fill="#15803d" />
        <circle cx="7" cy="7" r="2.5" fill="#22c55e" />
      </svg>
    );
  }

  if (status === "in-progress") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 14 14"
        fill="none"
        className="flex-shrink-0"
      >
        <circle cx="7" cy="7" r="5.5" stroke="#374151" strokeWidth="1.5" />
        {/* 120度の弧 (上から時計回り) */}
        <path
          d="M7 1.5 A5.5 5.5 0 0 1 11.76 9.75"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  // done
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      className="flex-shrink-0"
    >
      <circle cx="7" cy="7" r="6" fill="#7c3aed" />
      <path
        d="M4 7l2.5 2.5 3.5-4"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
