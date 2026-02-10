// ELEMENTS
const container = document.getElementById("recipesContainer");
const searchInput = document.getElementById("searchInput");
const searchBtnEl = document.getElementById("searchBtn");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

let allRecipes = [];

// MOBILE MENU TOGGLE
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  menuBtn.textContent = mobileMenu.classList.contains("hidden") ? "☰" : "✕";
});

// FETCH RECIPES
async function fetchRecipes() {
  try {
    const res = await fetch("https://dummyjson.com/recipes?limit=50");
    const data = await res.json();
    allRecipes = data.recipes;
    displayRecipes(allRecipes);
  } catch {
    container.innerHTML = "<p class='text-red-500'>Failed to load recipes.</p>";
  }
}

// DISPLAY RECIPE CARDS
function displayRecipes(recipes) {
  container.innerHTML = "";
  if (recipes.length === 0) {
    container.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  recipes.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden";
    const imgSrc = recipe.image || "https://via.placeholder.com/400x300?text=No+Image";

    card.innerHTML = `
      <img src="${imgSrc}" alt="${recipe.name}" class="h-48 w-full object-cover">
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2">${recipe.name}</h3>
        <p class="text-sm text-gray-500 mb-3">Cuisine: ${recipe.cuisine}</p>
        <a href="recipe.html?id=${recipe.id}" class="text-amber-800 font-medium hover:underline">
          View Recipe →
        </a>
      </div>
    `;
    container.appendChild(card);
  });
}

// SEARCH FUNCTION
function searchRecipes() {
  const term = searchInput.value.toLowerCase();
  const filtered = allRecipes.filter(r => r.name.toLowerCase().includes(term));
  displayRecipes(filtered);
}

searchBtnEl.addEventListener("click", searchRecipes);
searchInput.addEventListener("keyup", e => { if (e.key === "Enter") searchRecipes(); });

// INITIAL FETCH
fetchRecipes();
