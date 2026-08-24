const navLinks = [
  { id: "dashboard", label: "Dashboard" },
  { id: "developers", label: "Developers" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
];

export default function Nav({ current, onNav }) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-black/10">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-8">
        {/* Logo */}
        <button
          onClick={() => onNav("dashboard")}
          className="font-semibold text-base tracking-tight shrink-0"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          DevMatch
        </button>

        {/* Navigation */}
        <nav className="flex items-center gap-1 flex-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNav(link.id)}
              className={`px-3 py-1.5 text-sm rounded transition-colors ${
                current === link.id
                  ? "bg-black text-white"
                  : "text-black/60 hover:text-black hover:bg-black/5"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Find Developers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNav("find")}
            className="px-3 py-1.5 text-sm border border-black rounded hover:bg-black hover:text-white transition-colors"
          >
            Find Developers
          </button>
        </div>
      </div>
    </header>
  );
}