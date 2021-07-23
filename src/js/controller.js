import * as model from './model';
import * as config from './config';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';

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
const loadButton = document.querySelector('#load-more');
const bookmarksButton = document.querySelector('#my-recipes');
const contentDiv = document.querySelector('.bodyody');
const modeButton = document.querySelector('.mode');
const logoEl = document.querySelector('.logo');
const inputEl = document.querySelector('input');

firebase.initializeApp(config.firebaseConfig);

let currentPage = 1;

const getPageData = (data, page) => {
  let start = (page - 1) * config.PAGE_NUMBER_COUNT;
  let end = page * config.PAGE_NUMBER_COUNT;

  if (end >= model.state.recipes.length) loadButton.classList.add('hidden');
  return data.slice(start, end);
};

const changePage = () => {
  currentPage++;
  model.getRecipes().then(response => {
    let temp = response.map((recipe, id) => ({ ...recipe, id: id }));
    temp.forEach(data => {
      if (model.state.bookmarks.some(bookmark => bookmark.id === data.id)) {
        data.bookmarked = true;
      }
    });
    renderingAllRecipes(
      recipeContainer,
      getPageData(temp, currentPage),
      '-all',
      'beforeend'
    );
  });
};

loadButton.addEventListener('click', changePage);

const renderingAllRecipes = (location, data, type, position = 'afterbegin') => {
  data.forEach((recipe, index) => {
    const markup = ` <div id=recipe data-id=${index} class="slide${type} m-2 backdrop w-10/12 md:w-1/4 hover:bg-transparent  bg-white bg-opacity-10 rounded border border-gray-300 shadow-lg">
    <div class="w-full mb-3 p-3  flex justify-between border-gray-300">
      <div data-id=${recipe.id} class="flex items-center">
        <img class="object-cover w-10 h-10 rounded-full border-2 border-gray-300" src=${
          recipe.publisher.pic ||
          'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png'
        } />
        <a href=${
          recipe.publisher.social
        } target="_blank" class="capitalize ml-2 hover:underline cursor-pointer text-sm font-semibold text-shadow">${recipe.publisher.name.toLocaleLowerCase()}</a>
      </div>
      <div class="flex items-center">
       
          <i data-id=${
            recipe.id
          } class="save-btn hover:text-red-600 cursor-pointer fa-heart ${
      recipe.bookmarked ? 'fas text-red-600' : 'far'
    }" ></i>
      
      </div>
     
    </div>
    <a href="detail.html#${recipe.id}">
      <img src=${
        recipe.images[0]
      } alt="image1" class="w-full cursor-pointer h-48 object-cover mb-2">
      </a>
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
    location.insertAdjacentHTML(position, markup);
  });
};

//render top rated recipes
const topRatedReturn = data => {
  return (topRatedResults = data
    .filter(recipe => recipe.ratingsAverage >= 4)
    .sort((a, b) => b.ratingsQuantity - a.ratingsQuantity)
    .slice(0, 4)
    .reverse());
};

//search algorithm
const search = e => {
  e.preventDefault();
  const searchTerm = formEl.search.value;
  const searchResult = model.recipes.filter(recipe =>
    recipe.ingredients.join().includes(searchTerm)
  );
  topRatedDiv.classList.add('hidden');
  loadButton.classList.add('hidden');
  regionsContainer.classList.add('hidden');
  dietContainer.classList.add('hidden');
  recipeContainer.innerHTML = '';
  allResultsTitle.innerHTML = `${searchTerm}`;
  if (searchResult.length < 4) {
    loadBtn.classList.add('hidden');
  }
  renderingAllRecipes(recipeContainer, searchResult.slice(0, 3), '-search');
};

const filter = e => {
  e.preventDefault();
  const filterResult = model.state.recipes.filter(recipe =>
    recipe.tags.includes(e.target.dataset.id)
  );
  topRatedDiv.classList.add('hidden');
  loadButton.classList.add('hidden');
  regionsContainer.classList.add('hidden');
  dietContainer.classList.add('hidden');
  recipeContainer.innerHTML = '';
  allResultsTitle.innerHTML = `${
    e.target.dataset.id.toLocaleLowerCase().split('-')[0]
  } ${e.target.dataset.id.toLocaleLowerCase().split('-')[1] || ''} Recipes`;
  renderingAllRecipes(recipeContainer, filterResult.slice(0, 4));
};

searchBtn.addEventListener('click', search);
regionsDiv.addEventListener('click', filter);
dietDiv.addEventListener('click', filter);

const renderTags = (data, location, type) => {
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
                  
                    border border-gray-300
                    shadow-lg
                    cursor-pointer
                    m-2
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
      `;

    location.insertAdjacentHTML('afterbegin', markup);
  });
};
renderTags(model.state.region, regionsDiv, '-region');
renderTags(model.state.diet, dietDiv, '-diet');

contentDiv.addEventListener('click', function (e) {
  // e.preventDefault();
  if (e.target.classList.contains('save-btn')) {
    try {
      let recipe = model.state.recipes[e.target.dataset.id];
      if (e.target.classList.contains('fa-w-16')) {
        model.addBookmarks(recipe);
        e.target.classList.remove('far');
        e.target.classList.add('cursor-not-allowed', 'fas', 'text-red-600');
      } else {
        model.deleteBookmarks(recipe.id);
        e.target.classList.remove('fas', 'cursor-not-allowed', 'text-red-600');
        e.target.classList.add('far');
      }
    } catch (err) {
      console.log(err);
    } finally {
      console.log(model.state.bookmarks);
    }
  }
});

bookmarksButton.addEventListener('click', function (e) {
  e.preventDefault();
  topRatedDiv.classList.add('hidden');
  loadButton.classList.add('hidden');
  regionsContainer.classList.add('hidden');
  dietContainer.classList.add('hidden');
  recipeContainer.innerHTML = '';
  allResultsTitle.innerHTML = `Your Recipes`;
  renderingAllRecipes(recipeContainer, model.state.bookmarks);
});

const changeMode = () => {
  if (model.state.mode.dark) {
    document.body.classList.add('bg-gray-100', 'text-black');
    document.body.style.backgroundColor = 'white';
    inputEl.style.backgroundColor = 'white';
    logoEl.src =
      'https://github.com/Jules-Boogie/AfroFoodie/blob/main/src/img/logoLight.png?raw=true';
    modeButton.innerHTML = 'LightMode';
    model.setState('light', true);
    model.setState('dark', false);
  } else {
    document.body.classList.remove('bg-gray-100', 'text-black');
    logoEl.src =
      'https://github.com/Jules-Boogie/AfroFoodie/blob/main/src/img/logoDark.png?raw=true';
    modeButton.innerHTML = ' DarkMode';
    inputEl.style.backgroundColor = '#1f2123';
    document.body.style.backgroundColor = 'rgb(31, 33, 35)';
    document.body.style.color = 'white';
    model.setState('light', false);
    model.setState('dark', true);
  }
};

modeButton.addEventListener('click', changeMode);

const init = () => {
  if (model.state.mode.dark) {
    document.body.classList.add('text-white');
    document.body.style.backgroundColor = 'rgb(31, 33, 35)';
    logoEl.src =
      'https://github.com/Jules-Boogie/AfroFoodie/blob/main/src/img/logoDark.png?raw=true';
    modeButton.innerHTML = ' DarkMode';
    inputEl.style.backgroundColor = '#1f2123';
  } else {
    logoEl.src =
      'https://github.com/Jules-Boogie/AfroFoodie/blob/main/src/img/logoLight.png?raw=true';
    modeButton.innerHTML = 'LightMode';
    inputEl.style.backgroundColor = 'white';
    document.body.classList.add('bg-white', 'text-black');
    document.body.classList.remove('text-white');
  }
  model.getRecipes().then(response => {
    let temp = response.map((recipe, id) => ({ ...recipe, id: id }));
    temp.forEach(data => {
      if (model.state.bookmarks.some(bookmark => bookmark.id === data.id)) {
        data.bookmarked = true;
      }
    });
    model.state.recipes = temp;
    renderingAllRecipes(
      recipeContainer,
      getPageData(temp, currentPage),
      '-all'
    );
    renderingAllRecipes(topRatedContainer, topRatedReturn(temp), '-top');
  });
};
init();
