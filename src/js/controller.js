import * as model from './model.js';
const recipeContainer = document.querySelector('#all-results');
const topRatedContainer = document.querySelector('#top-rated');
const loadBtn = document.querySelector('#load-more');
const searchBtn = document.querySelector('#search-btn');
const formEl = document.querySelector('form');
const topRatedDiv = document.querySelector('#top-rated__div');
const allResultsTitle = document.querySelector('#all-results-title');
const dietContainer = document.querySelector('#by-diet');
const regionsContainer = document.querySelector('#by-regions');
const regionsDiv = document.querySelector('#recipes-region__div');
const dietDiv = document.querySelector('#diet__div');
const recipe = document.querySelector('#recipe');

const renderingAllRecipes = (location, data, type) => {
  data.forEach((recipe, index) => {
    const markup = ` <div id=recipe data-id=${index} class="slide${type} mr-4 backdrop w-10/12 md:w-1/4 hover:bg-transparent cursor-pointer bg-white bg-opacity-10 rounded  text-white border border-gray-300 shadow-lg">
    <a href="/detail.html">
    <div class="w-full mb-3 p-3  flex justify-between border-gray-300">
      <div data-id=${index} class="flex items-center">
        <img class="object-cover w-10 h-10 rounded-full border-2 border-gray-300" src=${
          recipe.publisher.pic ||
          'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png'
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
    </a>
  </div>`;
    location.insertAdjacentHTML('afterbegin', markup);
  });
};
//render all recipes
renderingAllRecipes(recipeContainer, model.state.recipes.slice(0, 3),'-all');

//render top rated recipes
const topRatedResults = model.state.recipes
  .filter(recipe => recipe.ratingsAverage >= 4)
  .sort((a, b) => b.ratingsQuantity - a.ratingsQuantity)
  .slice(0, 3)
  .reverse();
renderingAllRecipes(topRatedContainer, topRatedResults,'-top');

//search algorithm
const search = e => {
  e.preventDefault();
  const searchTerm = formEl.search.value;
  const searchResult = model.recipes.filter(recipe =>
    recipe.ingredients.join().includes(searchTerm)
  );
  topRatedDiv.classList.add('hidden');
  regionsContainer.classList.add('hidden');
  dietContainer.classList.add('hidden');
  recipeContainer.innerHTML = '';
  allResultsTitle.innerHTML = `${searchTerm}`;
  if (searchResult.length < 4) {
    loadBtn.classList.add('hidden');
  }
  renderingAllRecipes(recipeContainer, searchResult.slice(0, 3),'-search');
};

const filter = (e) => {
  e.preventDefault()
  console.log(e.target.dataset.id)
  const filterResult = model.state.recipes.filter(recipe => recipe.tags.includes(e.target.dataset.id));
  topRatedDiv.classList.add('hidden');
  regionsContainer.classList.add('hidden');
  dietContainer.classList.add('hidden');
  recipeContainer.innerHTML = '';
  allResultsTitle.innerHTML = `${(e.target.dataset.id).toLocaleLowerCase().split('-')[0]} ${(e.target.dataset.id).toLocaleLowerCase().split('-')[1] || ""} Recipes`;
  renderingAllRecipes(recipeContainer,filterResult.slice(0,3));
};

searchBtn.addEventListener('click', search);
regionsDiv.addEventListener('click', filter);
dietDiv.addEventListener('click',filter);


const renderTags = (data, location,type) => {
  data.forEach(reg => {
    const markup = `
      <div data-id=${reg.id}
                  class="
                  slide${type}
                    transform
                    hover:-translate-y-2
                    transition
                    delay-150
                    duration-300
                    ease-in-out
                    backdrop
                    w-10/12
                    md:w-1/4
                    bg-white bg-opacity-10
                    rounded-md
                    p-3
                    text-white
                    border border-gray-300
                    shadow-lg
                    cursor-pointer
                    mr-4
                  "
                >
                  <a>
                    <img
                    data-id=${reg.id}
                      class="w-full h-48 object-cover mb-2"
                      src=${reg.img}
                      alt="east-africa"
                    />
                  </a>
                  <p>${reg.name}</p>
                </div>
      `

    location.insertAdjacentHTML('afterbegin', markup);
  });
};
renderTags(model.state.region.slice(0,3), regionsDiv,'-region');
renderTags(model.state.diet.slice(0,3), dietDiv,'-diet');

