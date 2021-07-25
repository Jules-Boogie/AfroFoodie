# AfroFoodie

An offline application to store and use recipes.

## Deployed Link
https://learning-68ad4.firebaseapp.com/

## Technologies Used
| Technologies | Description  |
|---------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------:|
| [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)                                     |            JavaScript is a prototype-based, multi-paradigm, single-threaded, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles               |
| [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)                |   CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.               |
| [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)                |   HTML (HyperText Markup Language) is the most basic building block of the Web. It defines the meaning and structure of web content.                |
| [FireBase Realtime Database](https://firebase.google.com/)                |  A realtime database to store, view and get data. |
| [TailWindCSS](https://tailwindcss.com/docs) | A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.|

### App Photos
<img src="https://github.com/Jules-Boogie/AfroFoodie/blob/main/src/img/AfroFoodie__%20Search%20for%20Afro%20Inspired%20recipes.gif"  width="100%" >
<img src="https://github.com/Jules-Boogie/AfroFoodie/blob/main/src/img/AfroFoodie__%20Search%20for%20Afro%20Inspired%20recipes%20(2).gif"  width="100%" >
<img src="https://github.com/Jules-Boogie/AfroFoodie/blob/main/src/img/darkmode.PNG"  width="100%" >

### App Photo (Recipe Detail)

<img src="https://github.com/Jules-Boogie/AfroFoodie/blob/main/src/img/fooddetail.PNG" width="100%">

### Code Snippet

```
// Bookmarking a recipe


// controller/view
contentDiv.addEventListener('click', function (e) {
  if (e.target.classList.contains('save-btn')) {
    try {
      let recipe = model.state.recipes[e.target.dataset.id];
      if (e.target.classList.contains('far')) {
        model.addBookmarks(recipe);
        e.target.classList.remove('far');
        e.target.classList.add('cursor-not-allowed', 'fas', 'text-red-600');
      }
      if (e.target.classList.contains('fas')) {
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


// model
import data from '../data/data';

export const state = {
  recipes: data.recipes.map((recipe, id) => ({ ...recipe, id: id })),
  region: data.region,
  diet: data.diet,
  bookmarks: [],
};

export const addBookmarks = recipe => {
  state.bookmarks.push(recipe);
  state.recipes[recipe.id].bookmarked = true;
};


export const deleteBookmarks = recipeId => {
  const id = state.bookmarks.findIndex(recipe => recipe.id == recipeId)
  state.bookmarks.splice(id,1)
  state.recipes[id].bookmarked = false
}

```
