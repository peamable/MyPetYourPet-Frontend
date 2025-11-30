export function Logo({ size = 22, color = "#f1741e", className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
    >
      <path d="M32 14c4-8 18-3 16 6-2 7-12 14-16 18-4-4-14-11-16-18-2-9 12-14 16-6z" fill={color}/>
      <ellipse cx="20" cy="42" rx="5" ry="6" fill={color}/>
      <ellipse cx="32" cy="46" rx="5" ry="6" fill={color}/>
      <ellipse cx="44" cy="42" rx="5" ry="6" fill={color}/>
    </svg>
  );
}
