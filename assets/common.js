// Shared helpers used across pages.

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Deterministic color pair from a string, used for placeholder thumbnails.
function colorsFromString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h1 = Math.abs(hash) % 360;
  const h2 = (h1 + 55) % 360;
  return [`hsl(${h1} 70% 45%)`, `hsl(${h2} 70% 35%)`];
}

// Builds a data-URI SVG placeholder thumbnail with the game's initials.
function placeholderThumb(title) {
  const [c1, c2] = colorsFromString(title);
  const initials = title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join("");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${c1}"/>
          <stop offset="100%" stop-color="${c2}"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#g)"/>
      <text x="50%" y="53%" font-family="Segoe UI, sans-serif" font-size="64"
            font-weight="800" fill="rgba(255,255,255,0.92)"
            text-anchor="middle" dominant-baseline="middle">${initials}</text>
    </svg>`;
  return "data:image/svg+xml;base64," + btoa(svg);
}

function gameThumbSrc(game) {
  return game.thumbnail && game.thumbnail.trim() ? game.thumbnail : placeholderThumb(game.title);
}

function setupNavToggle() {
  const btn = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!btn || !nav) return;
  btn.addEventListener("click", () => nav.classList.toggle("open"));
}

document.addEventListener("DOMContentLoaded", setupNavToggle);
