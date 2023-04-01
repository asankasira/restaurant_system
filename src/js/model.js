import {API_URL, API_KEY, DEFAULT_PAGE_SIZE} from './utils/config';
import {getJsonResponse as getJsonResp, getRecipe} from './utils/helper';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    pageSize: DEFAULT_PAGE_SIZE,
    currentPage: 1,
    currentStartIndex: 0
  },
  bookmarks: []
}

export const loadRecipe = async (id) => {
  try {
    const data = await getJsonResp(`${API_URL}/${id}?key=${API_KEY}`);
    const {recipe} = data.data;
    state.recipe = getRecipe(recipe);
    state.recipe.bookmarked = state.bookmarks.some(r => r.id === id);

  } catch (err) {
    throw err;
  }
}

export const searchRecipe = async (query) => {
  try {
    state.search.query = query;
    const data = await getJsonResp(`${API_URL}?search=${query}&key=${API_KEY}`);

    const recipes = data.data?.recipes.map(getRecipe);
    state.search.results = recipes;
    state.search.currentPage = 1;
    state.search.currentStartIndex = 0;
    if(!recipes || recipes.length === 0)
      throw new Error(`"${query}" Recipies not found`);

  } catch (err) {
    throw err;
  }
}

export const getPageResults = (pageNum = state.search.currentPage) => {
  state.search.currentPage = pageNum;
  const pageSize = state.search.pageSize;
  const start = (pageNum - 1) * pageSize;
  const end = pageNum * pageSize;
  state.search.currentStartIndex = start;

  return state.search.results.slice(start, end);
}

export const updateServings = (numOfServing) => {
  state.recipe.ingredients?.forEach(ing => {
    if(ing.quantity) {
       ing.quantity = (ing.quantity * numOfServing) / state.recipe.servings;
    }
  });
  state.recipe.servings = numOfServing;
}

export const toggleBookMarks = (id) => {
  state.recipe.bookmarked = !state.recipe.bookmarked;

  if(state.recipe.bookmarked) {
    state.bookmarks.push(state.recipe);
  }else{
    state.bookmarks = state.bookmarks.filter(r => r.id !== id);
  }
  localStorage.setItem('savedBookMarks', JSON.stringify(state.bookmarks));
}

export const loadBookmars = () => {
   const storage = JSON.parse(localStorage.getItem('savedBookMarks'));
   if(storage) state.bookmarks = storage;
}

