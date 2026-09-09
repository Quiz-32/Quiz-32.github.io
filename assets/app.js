// Homepage logic: renders category pills + game grid, handles search/filter/sort.

let activeCategory = "All";

function renderCategories() {
  const box = document.getElementById("categories");
  const all = ["All", ...CATEGORIES];
  box.innerHTML = all
    .map(cat => `<button class="pill${cat === activeCategory ? " active" : ""}" data-cat="${cat}">${cat}</button>`)
    .join("");
  box.querySelectorAll(".pill").forEach(btn => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.cat;
      renderCategories();
      renderGrid();
    });
  });
}

function getFilteredGames() {
  const query = document.getElementById("search").value.trim().toLowerCase();
  const sortMode = document.getElementById("sort").value;

  let list = GAMES.filter(g => {
    const matchesCategory = activeCategory === "All" || g.category.includes(activeCategory);
    const matchesQuery = !query || g.title.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  if (sortMode === "az") list.sort((a, b) => a.title.localeCompare(b.title));
  if (sortMode === "za") list.sort((a, b) => b.title.localeCompare(a.title));

  return list;
}

function renderGrid() {
  const grid = document.getElementById("game-grid");
  const list = getFilteredGames();

  document.getElementById("game-count").textContent = `${list.length} games`;

  if (list.length === 0) {
    grid.innerHTML = `<div class="empty-state">No games found. Try a different search or category.</div>`;
    return;
  }

  grid.innerHTML = list
    .map(g => `
      <a class="game-card" href="play.html?slug=${encodeURIComponent(slugify(g.title))}">
        <img class="game-thumb" src="${gameThumbSrc(g)}" alt="${g.title}" loading="lazy">
        <div class="game-title">${g.title}</div>
      </a>
    `)
    .join("");
}

function resetFilters() {
  activeCategory = "All";
  document.getElementById("search").value = "";
  document.getElementById("sort").value = "az";
  renderCategories();
  renderGrid();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderGrid();
  document.getElementById("search").addEventListener("input", renderGrid);
  document.getElementById("sort").addEventListener("change", renderGrid);
  document.getElementById("reset-btn").addEventListener("click", resetFilters);
});
