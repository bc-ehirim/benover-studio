export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-10 pb-28 text-center sm:px-8 sm:pb-10">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold">Benover Tech</p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Captions and videos are created locally. Images use a free online service; no account or
          upload is required. Download your media, then post manually.
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Benover Tech
        </p>
      </div>
    </footer>
  );
}
