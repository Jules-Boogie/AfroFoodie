const recipeContainer = document.querySelector('#all-results');
const topRatedContainer = document.querySelector('#top-rated');
const loadBtn = document.querySelector('#load-more');
const searchBtn = document.querySelector('#search-btn');
const formEl = document.querySelector('form');
const topRatedDiv = document.querySelector('#top-rated__div');
const allResultsTitle = document.querySelector('#all-results-title');
const dietContainer = document.querySelector('#by-diet');
const regionsContainer = document.querySelector('#by-regions');

const recipes = require('../data/recipes');

const renderingAllRecipes = (location, data) => {
  data.forEach((recipe, index) => {
    const markup = `<div data-id=${index} class="backdrop w-10/12 md:w-1/4 hover:bg-transparent cursor-pointer bg-white bg-opacity-10 rounded  text-white border border-gray-300 shadow-lg">
    <div class="w-full mb-3 p-3  flex justify-between border-gray-300">
      <div class="flex items-center">
        <img class="object-cover w-10 h-10 rounded-full border-2 border-gray-300" src=${
          recipe.publisher.pic ||
          'https://lh3.googleusercontent.com/proxy/26L4LrmkTyBm8qWB2a34D0utKd5nNie7-fCjGxCKccQPtB2oqMshWGYgFjgeZ45SMU5AVFrQxZeTA4wjVXUyotCE2Nf7ND-RR6QEeG5b3bWdNtwEbEdV2-KncacR-0YSLxuRlE73pGCcPw'
        } />
        <h3 class="capitalize ml-2 hover:underline cursor-pointer text-sm font-semibold text-shadow">${recipe.publisher.name.toLocaleLowerCase()}</h3>
      </div>
      <div class="flex items-center">
        <button data-id=${index} id="save-btn" class="focus:outline-none btn  ml-8 w-12 h-full rounded-full text-white">
          <i class="hover:text-red-600 far fa-heart"></i>
        </button>
      </div>
     
    </div>

      <img src=${
        recipe.images[0]
      } alt="image1" class="w-full h-48 object-cover mb-2">
      <div class="p-3">
      <p class="mb-3 tracking-wide text-base text-shadow">
        <i class=" text-red-600 fas fa-star"></i>
        <span> ${recipe.ratingsAverage} &middot;  (${
      recipe.ratingsQuantity
    }) &middot; </span> 
       <span> ${recipe.country} </span> 
      </p>
      <p class="mb-3 capitalize  tracking-wide text-base text-shadow">
       ${recipe.name.toLocaleLowerCase()} &middot;<span> ${
      recipe.time.split(':')[0]
    }hr ${recipe.time.split(':')[1]}mins</span>
      </p>
    </div>
  </div>`;
    location.insertAdjacentHTML('afterbegin', markup);
  });
};
//render all recipes
renderingAllRecipes(recipeContainer, recipes.slice(0, 4));

//render top rated recipes
const topRatedResults = recipes
  .filter(recipe => recipe.ratingsAverage >= 4)
  .sort((a, b) => b.ratingsQuantity - a.ratingsQuantity)
  .slice(0, 4)
  .reverse();
renderingAllRecipes(topRatedContainer, topRatedResults);

//search algorithm
const search = e => {
  e.preventDefault();
  const searchTerm = formEl.search.value;
  const searchResult = recipes.filter(recipe =>
    recipe.ingredients.join().includes(searchTerm)
  );
  topRatedDiv.classList.add('hidden');
  regionsContainer.classList.add('hidden');
  dietContainer.classList.add('hidden');
  recipeContainer.innerHTML = '';
  allResultsTitle.innerHTML = 'Search Results';
  if (searchResult.length < 4) {
    loadBtn.classList.add('hidden');
  }
  renderingAllRecipes(recipeContainer, searchResult.slice(0, 4));
};

searchBtn.addEventListener('click', search);

const filter = region => {
  const filterResult = recipes.filter(recipe => recipe.tags.includes(region));
  topRatedDiv.classList.add('hidden');
  regionsContainer.classList.add('hidden');
  dietContainer.classList.add('hidden');
  recipeContainer.innerHTML = '';
  allResultsTitle.innerHTML = `Recipes from ${region}`;
};
