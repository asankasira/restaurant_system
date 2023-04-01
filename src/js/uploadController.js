import * as upModel from './uploadModel';
import {recipeView, bookMarksView} from './controller';
import uploadRecipeView from './view/uploadRecipeView.js';
import {waitFor} from './utils/helper';
import {MODAL_CLOSE_SEC} from './utils/config';


const uploadRecipeControl = async (newRecipe) => {
    try {
        uploadRecipeView.renderSpinner();

        await upModel.uploadRecipe(newRecipe);

        uploadRecipeView.renderMessage();

        recipeView.render(upModel.state.recipe);
        bookMarksView.render(upModel.state.bookmarks);

        //Change ID in URL
        window.history.pushState(null, '', `#${upModel.state.recipe.id}`)

        await waitFor(MODAL_CLOSE_SEC);
        uploadRecipeView.toggelModalWindow();

    } catch(err) {
        uploadRecipeView.renderError(err.message);
    }
}

const init = () => {
    uploadRecipeView.addHandlerUpload(uploadRecipeControl);
}
init();