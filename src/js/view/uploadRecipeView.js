import View from './view';

class UploadRecipeView extends View {
    _parentElement = document.querySelector('form.upload');
    _overlay = document.querySelector('.overlay');
    _recipeModal = document.querySelector('.add-recipe-window');
    _openBtn = document.querySelector('.nav__btn--add-recipe');
    _closeBtn = document.querySelector('.btn--close-modal');

    _sucessMessage = `Recipe data upload successful`;

    constructor() {
        super();
        this._registerEvents();
    }

    toggelModalWindow() {
        this._overlay.classList.toggle('hidden');
        this._recipeModal.classList.toggle('hidden');
    }

    _openPopUpDialog() {
        this._clear();
        this._parentElement.querySelectorAll('div.upload__column, .upload__btn')?.forEach(e => e.classList.remove('dismantle'));
        this.toggelModalWindow();
    }

    _registerEvents() {
        this._openBtn.addEventListener('click', this._openPopUpDialog.bind(this));
        this._closeBtn.addEventListener('click', this.toggelModalWindow.bind(this));
        this._overlay.addEventListener('click', this.toggelModalWindow.bind(this));
    }

    _clear() {
        const el = this._parentElement.querySelector('div.spinner, div.error, div.message');
        el && this._parentElement.removeChild(el);
        this._parentElement.querySelectorAll('div.upload__column, .upload__btn')?.forEach(e => e.classList.add('dismantle'));
    }

    renderMessage(message = this._sucessMessage) {
        super.renderMessage(message);
        this._parentElement.reset();
    }

    addHandlerUpload(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            const data = Object.fromEntries([...new FormData(this)]);
            handler(data);
        });
    }
}

export default new UploadRecipeView();
