type TagBadgeProps = {
  name: string;
};

export default function TagBadge({ name }: TagBadgeProps) {
  return (
    <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-300 border border-indigo-500/30">
      TagBadge: #{name}
    </span>
  );
}
