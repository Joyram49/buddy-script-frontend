interface OrDividerProps {
  label?: string;
}

export function OrDivider({ label = "Or" }: OrDividerProps) {
  return (
    <div className="mb-10 flex items-center justify-center gap-4">
      <span className="bg-buddy-divider h-0.5 w-[108px] shrink-0 rounded-full" />
      <span className="text-buddy-subtle text-sm leading-snug">{label}</span>
      <span className="bg-buddy-divider h-0.5 w-[108px] shrink-0 rounded-full" />
    </div>
  );
}
