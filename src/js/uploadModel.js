import * as model from './model';
import {postData, getRecipe} from './utils/helper';
import {API_URL, API_KEY} from './utils/config';

export const state = model.state;

export const uploadRecipe = async (newRecipe) => {
    try {

      const ingredients = Object.entries(newRecipe).filter(([k,v]) => k.startsWith('ingredient') && v)
            .map(([k,v]) => {
                const ing = v.split(',').map(e => e.trim());
                if(ing.length !== 3) throw new Error(`Incorrect ingredient format: ${k}`);

                const [quantity, unit, description] = ing;
                return {quantity: quantity ? +quantity : null, unit, description}
            });
            
      const recipe = {
        title: newRecipe.title,
        source_url: newRecipe.sourceUrl,
        image_url: newRecipe.image,
        publisher: newRecipe.publisher,
        cooking_time: +newRecipe.cookingTime,
        servings: +newRecipe.servings,
        ingredients
      }
      
      const resp = await postData(`${API_URL}?key=${API_KEY}`, recipe);
      state.recipe = getRecipe(resp.data.recipe);
      model.toggleBookMarks(state.recipe.id);

    } catch (err) {
        throw err;
    }
}

