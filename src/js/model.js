import {API_URL, DEFAULT_PAGE_SIZE} from './utils/config';
import {getJsonResponse as getJsonResp} from './utils/helper';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    pageSize: DEFAULT_PAGE_SIZE,
    currentPage: 1,
    currentStartIndex: 0
  }
};

export const loadRecipe = async (id) => {
  try {
    const data = await getJsonResp(`${API_URL}/${id}`);
    const {recipe} = data.data;
    state.recipe = getRecipe(recipe);

  } catch (err) {
    throw err;
  }
};

export const searchRecipe = async (query) => {
  try {
    state.search.query = query;
    const data = await getJsonResp(`${API_URL}?search=${query}`);

    const recipes = data.data?.recipes.map(getRecipe);
    state.search.results = recipes;
    state.search.currentPage = 1;
    state.search.currentStartIndex = 0;
    if(!recipes || recipes.length === 0)
      throw new Error(`"${query}" Recipies not found`);

  } catch (err) {
    throw err;
  }
};

export const getPageResults = (pageNum = state.search.currentPage) => {
  state.search.currentPage = pageNum;
  const pageSize = state.search.pageSize;
  const start = (pageNum - 1) * pageSize;
  const end = pageNum * pageSize;
  state.search.currentStartIndex = start;

  return state.search.results.slice(start, end);
};

export const updateServings = (numOfServing) => {
  state.recipe.ingredients?.forEach(ing => {
    if(ing.quantity) {
       ing.quantity = (ing.quantity * numOfServing) / state.recipe.servings;
    }
  });
  state.recipe.servings = numOfServing;
};


const getRecipe = (recipe) => {
    let rcp = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    }

    // Removing undefined or null properties
    rcp = Object.entries(rcp).reduce((acc, [key, value]) => {
        acc[key] = value;
        value ?? delete acc[key];
        return acc;
    }, {})

    return rcp;
}