const footerLinks = [
  "About",
  "Blog",
  "Store",
  "Efficacy",
  "Careers",
  "Investors",
  "Terms",
  "Privacy",
];

export function FooterLinks() {
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1">
      {footerLinks.map((link) => (
        <button
          key={link}
          type="button"
          className="text-[11px] font-extrabold uppercase tracking-wide text-duo-text-muted transition-colors hover:text-white"
        >
          {link}
        </button>
      ))}
    </div>
  );
}
