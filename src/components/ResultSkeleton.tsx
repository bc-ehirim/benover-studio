export function ResultSkeleton() {
  return (
    <div className="panel mt-8 animate-pulse space-y-4 p-5" aria-live="polite" aria-busy="true">
      <div className="flex gap-2">
        <div className="h-6 w-20 rounded-full bg-surface-raised" />
        <div className="h-6 w-16 rounded-full bg-surface-raised" />
        <div className="h-6 w-24 rounded-full bg-surface-raised" />
      </div>
      <div className="h-7 w-3/4 rounded-lg bg-surface-raised" />
      <div className="h-4 w-2/3 rounded bg-surface-raised" />
      <div className="space-y-2 pt-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-3.5 rounded bg-surface-raised"
            style={{ width: `${92 - i * 7}%` }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5 pt-3">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="h-6 w-20 rounded-full bg-surface-raised" />
        ))}
      </div>
      <p className="pt-2 text-center text-xs text-muted-foreground">Writing your content…</p>
    </div>
  );
}
