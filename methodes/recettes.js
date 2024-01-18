let recipes = [];
let sentOrders = [];

window.onload = function () {
  const storedRecipes = localStorage.getItem('recipes');
  if (storedRecipes) {
    recipes = JSON.parse(storedRecipes);
    updateRecipeList();
  }

  const storedSentOrders = localStorage.getItem('sentOrders');
  if (storedSentOrders) {
    sentOrders = JSON.parse(storedSentOrders);
    updateSentOrders();
  }
};

function addRecipe() {
  const recipeName = document.getElementById('recipeName').value;
  const ingredients = document.getElementById('ingredients').value;

  if (recipeName && ingredients) {
    const recipe = { name: recipeName, ingredients: ingredients, sauce: "Sans sauce" };
    
    recipes.push(recipe);
    updateRecipeList();

    localStorage.setItem('recipes', JSON.stringify(recipes));

    document.getElementById('recipeName').value = '';
    document.getElementById('ingredients').value = '';
  }
}

function sendToKitchen(index) {
  const recipe = recipes[index];

  const sauceDropdown = document.getElementById(`sauceDropdown_${index}`);
  const selectedSauce = sauceDropdown ? sauceDropdown.value : "Sans sauce";

  const sentRecipe = { ...recipe, sauce: selectedSauce };
  sentOrders.push(sentRecipe);

  recipes.push({ ...recipe });

  recipes.splice(index, 1);

  updateRecipeList();
  updateSentOrders();

  localStorage.setItem('recipes', JSON.stringify(recipes));
  localStorage.setItem('sentOrders', JSON.stringify(sentOrders));
}

function deleteRecipe(index) {
  recipes.splice(index, 1);
  updateRecipeList();

  localStorage.setItem('recipes', JSON.stringify(recipes));
}

function updateRecipeList() {
  const recipeList = document.getElementById('recipeList');
  recipeList.innerHTML = '';

  recipes.forEach((recipe, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      ${recipe.name} - ${recipe.ingredients} 
      <div class="container mt-3">
  <div class="row">
    <div class="col-md-6">
        <label for="sauceDropdown_${index}" class="form-label"></label>
        <select id="sauceDropdown_${index}" class="form-select mb-3">
            <option value="Sans sauce" selected>Sans sauce</option>
            <option value="Gruyère">Gruyère</option>
            <option value="Biggy Burger">Biggy Burger</option>
            <option value="Chili thai">Chili thai</option>
            <option value="Algérienne">Algérienne</option>
            <option value="Blanche">Blanche</option>
            <option value="Andalouse">Andalouse</option>
            <option value="Samouraï">Samouraï</option>
            <option value="Barbecue">Barbecue</option>
            <option value="Harissa">Harissa</option>
            <option value="Marocaine">Marocaine</option>
            <option value="Mayonnaise">Mayonnaise</option>
            <option value="Ketchup">Ketchup</option>
            <option value="LA SAUCE DU CHEF">LA SAUCE DU CHEF</option>
      </select>
      <div class="col-md-6">
      <button onclick="sendToKitchen(${index})" class="btn btn-primary">Envoyer en cuisine</button>
      <button onclick="deleteRecipe(${index})" class="btn btn-danger">Supprimer</button>
    </div>
    </div>

  </div>
</div>
<hr>
    `;
    recipeList.appendChild(listItem);
  });
}

function updateSentOrders() {
  const sentOrdersList = document.getElementById('sentOrders');
  sentOrdersList.innerHTML = '';

  sentOrders.forEach((recipe) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${recipe.name} - ${recipe.ingredients} - Sauce : ${recipe.sauce}`;
    sentOrdersList.appendChild(listItem);
  });
}
