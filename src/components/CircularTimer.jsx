export const CircularTimer = ({ timer, maxTime = 30 }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = (timer / maxTime) * circumference;

  return (
    <svg width="100" height="100" className="-rotate-90">
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="8"
      />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="#3b82f6"
        strokeWidth="8"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        className="transition-all duration-1000"
      />
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          transformOrigin: "50px 50px",
          transform: "rotate(90deg)",
          fill: "currentColor",
        }}
        fontSize="28"
        fontWeight="bold"
      >
        {timer}
      </text>
    </svg>
  );
};
