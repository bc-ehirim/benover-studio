export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-10 pb-28 text-center sm:px-8 sm:pb-10">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold">BENOVER Content Studio</p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Everything is generated on your device. No accounts, no databases, no uploads. Copy,
          create media elsewhere, then post manually.
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} BENOVERTECH
        </p>
      </div>
    </footer>
  );
}
