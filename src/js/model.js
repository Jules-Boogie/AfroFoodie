import data from '../data/data';

export const state = {
  recipes: data.recipes.map((recipe, id) => ({ ...recipe, id: id })),
  region: data.region,
  diet: data.diet,
};
