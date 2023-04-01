
import * as model from './model.js';
import homeView from './view/homeView.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import paginationButtonView from './view/paginationView.js';
import bookMarksView from './view/bookMarksView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async (id = null) => {
  try {
    if(!id) return;
    //Loading spinner untill data is fetched
    recipeView.renderSpinner();

    //Auto selecting the preview element (resultsView & bookMarkView)
    resultsView.fireHashChangeEvent(id);
    resultsView.selectPreview(id);

    //Loading recipe
    await model.loadRecipe(id);

    const {recipe} = model.state;

    //Rendering recipe
    recipeView.render(recipe);

  } catch (err) {
    recipeView.renderError();
  }
}

const controlSearchResults = async (query) => {
    try {
      resultsView.renderSpinner();

      await model.searchRecipe(query);

      console.log(model.state.search.results);
      //Pagination support
      resultsView.render(model.getPageResults());
      paginationButtonView.render(model.state.search);
      await controlRecipes(model.state.search.results?.[0].id);

    } catch (err) {
      resultsView.renderError(`${err.message}`);
    }
}

const controlPaginationGoTo = (pageNum) => {
    resultsView.render(model.getPageResults(pageNum));
    paginationButtonView.render(model.state.search);
    const {results, currentStartIndex} = model.state.search;
    controlRecipes(results?.[currentStartIndex]?.id);
}

const controlServingsUpdate = (numOfServing) => {
   model.updateServings(numOfServing);
   recipeView.render(model.state.recipe);
}

const controlToggleBookMark = (id) => {
  model.toggleBookMarks(id);
  recipeView.render(model.state.recipe);
  bookMarksView.render(model.state.bookmarks);
}

const loadBookmars = () => {
   model.loadBookmars();
   bookMarksView.render(model.state.bookmarks);
}

//Publisher subscriber pattern
const init = () => {
  homeView.addHandlerLoad(loadBookmars);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerServingUpdate(controlServingsUpdate);
  recipeView.addHandlerBookMark(controlToggleBookMark);
  searchView.addHandlerSearch(controlSearchResults);
  resultsView.addHandlerSelect(controlRecipes); //common for both results and bookmarks view
  paginationButtonView.addHandlerClick(controlPaginationGoTo);
}

init();

export {recipeView, bookMarksView};