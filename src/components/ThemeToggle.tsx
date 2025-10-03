import { useEffect, useState } from "react";

const STORAGE_KEY = "dm_theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY) || "dark";
  });

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("light", "dark");
    html.classList.add(theme === "light" ? "light" : "dark");
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}
