export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M24 40V18m0 14C10 32 9 21 8 10c10 1 16 7 16 18m0 1c0-11 7-18 17-20-1 12-6 20-17 20Zm0-7c-7-7-6-15 0-21 6 7 7 14 0 21Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M17 40h14" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
