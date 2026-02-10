// ELEMENTS
const detailsContainer = document.getElementById("recipeDetails");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

// MOBILE MENU TOGGLE
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  menuBtn.textContent = mobileMenu.classList.contains("hidden") ? "☰" : "✕";
});

// GET RECIPE ID FROM URL
const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");

// FETCH RECIPE DETAILS
async function fetchRecipeDetails() {
  try {
    const res = await fetch(`https://dummyjson.com/recipes/${recipeId}`);
    const recipe = await res.json();
    displayRecipe(recipe);
  } catch {
    detailsContainer.innerHTML = "<p class='text-red-500'>Failed to load recipe.</p>";
  }
}

// DISPLAY RECIPE
function displayRecipe(recipe) {
  const imgSrc = recipe.image || "https://via.placeholder.com/400x300?text=No+Image";

  detailsContainer.innerHTML = `
    <img src="${imgSrc}" class="w-full h-64 object-cover rounded-xl mb-6">
    <h2 class="text-3xl font-bold mb-2">${recipe.name}</h2>
    <p class="text-gray-500 mb-4">Cuisine: ${recipe.cuisine} | Difficulty: ${recipe.difficulty}</p>

    <h3 class="text-xl font-semibold mt-6 mb-2">Ingredients</h3>
    <ul class="list-disc pl-6 space-y-1">
      ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
    </ul>

    <h3 class="text-xl font-semibold mt-6 mb-2">Instructions</h3>
    <ol class="list-decimal pl-6 space-y-2">
      ${recipe.instructions.map(s => `<li>${s}</li>`).join("")}
    </ol>
  `;
}

fetchRecipeDetails();
