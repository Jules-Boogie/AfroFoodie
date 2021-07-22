import data from '../data/data';

export const state = {
  recipes: data.recipes.map((recipe, id) => ({ ...recipe, id: id })),
  region: data.region,
  diet: data.diet,
  bookmarks: [],
};

export const addBookmarks = recipe => {
  state.bookmarks.push(recipe);
  state.recipes.forEach(rec => {
    if (rec.id === recipe.id) rec[bookmarked] = true;
  });
};
