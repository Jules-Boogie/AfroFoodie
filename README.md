# AfroFoodie
 An offline application to stores and use recipes. 


### App Gif(Search Feature)
<img src="https://github.com/Jules-Boogie/AfroFoodie/blob/main/src/img/AfroFoodie__%20Search%20for%20Afro%20Inspired%20recipes.gif"  width="100%" >


###  App Photo (Dark Mode)

<img src="https://github.com/Jules-Boogie/AfroFoodie/blob/main/src/img/darkmode.PNG"  width="100%" >

### App Photo (Recipe Detail)

<img src="https://github.com/Jules-Boogie/AfroFoodie/blob/main/src/img/fooddetail.PNG" width="100%">


### Code Snippet 

```
// Bookmarking a recipe


// controller/view
contentDiv.addEventListener('click', function (e) {
  try{
    let recipe = model.state.recipes[e.target.dataset.id];
    model.addBookmarks(recipe)
    e.target.classList.toggle('cursor-not-allowed bg-red-500');
  }catch(err){
    console.log(err)
  }finally{
    console.log(model.state.bookmarks)
  }
});

// model
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

```