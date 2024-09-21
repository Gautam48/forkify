import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    resultsView.update(model.getSearchResultsPage())
    recipeView.renderSpinner();
    await model.getRecipe(id)
    recipeView.render(model.state.recipe);
    bookmarksView.update(model.state.bookmarks);
    controlServings();
  }
  catch (err) {
    recipeView.renderError();
  }
}

async function controlSearchResults() {
  try {

    const query = searchView.getQuery();

    if (!query) return;

    resultsView.renderSpinner();

    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultsPage(1));
    paginationView.render(model.state.search);
    // model.resetState();
  } catch (err) {
    console.log(err);
  }
}

function controlPagination(page) {
  resultsView.render(model.getSearchResultsPage(page));
  paginationView.render(model.state.search);
}

function controlServings(newServing = 1) {
  model.updateServings(newServing);
  recipeView.update(model.state.recipe);
}

function controlAddBookmark() {

  if (model.state.recipe.bookmarked == false) {
    model.addBookmark(model.state.recipe)
  }
  else {
    model.deleteBookmark(model.state.recipe.id);
  }

  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
}

function controlBookmarks() {
  bookmarksView.render(model.state.bookmarks);
}

async function controlAddRecipe(newRecipe) {
  try {

    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);

    recipeView.render(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);

    window.history.pushState(null, '', model.state.recipe.id);

    addRecipeView.toggleWindow();
    addRecipeView.remakeUploadForm();
  }
  catch (err) {
    console.log(err);
    addRecipeView.renderError();
  }
}

function init() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings)
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  console.log("abc");
}

init();