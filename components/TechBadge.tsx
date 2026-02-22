export const TechBadge = ({ name }: { name: string }) => (
  <span className="px-2 py-1 bg-blue-900/20 border border-blue-500/30 rounded text-xs font-mono text-blue-300 uppercase">
    {name}
  </span>
);