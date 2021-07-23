import data from '../data/data';

export const getRecipes = async () => {
  try {
    const response = await fetch(
      'https://learning-68ad4-default-rtdb.firebaseio.com/0.json'
    );
    const data1 = await response.json();
    if (!response.ok)
      throw new Error('call to the database was not successful');

    return data1;
  } catch (err) {
    console.log(err);
  }
};

export const state = {
  recipes: [],
  region: data.region,
  diet: data.diet,
  bookmarks: [],
};

const storeBookmark = () => {
  localStorage.setItem('bookmark', JSON.stringify(state.bookmarks));
};

const retrieveBookmark = () => {
  const bookmark = localStorage.getItem('bookmark');
  if (bookmark) state.bookmarks = JSON.parse(bookmark);
};

export const addBookmarks = recipe => {
  recipe = { ...recipe, bookmarked: true };
  state.bookmarks.push(recipe);
  state.recipes[recipe.id].bookmarked = true;
  storeBookmark();
};

export const deleteBookmarks = recipeId => {
  const id = state.bookmarks.findIndex(recipe => recipe.id == recipeId);
  state.bookmarks.splice(id, 1);
  state.recipes[id].bookmarked = false;
  storeBookmark();
};

const init = () => {
  retrieveBookmark();
};

init();
