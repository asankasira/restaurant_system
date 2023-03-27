import icons from 'url:../../img/icons.svg';

export default class View {
    _parentElement;
    _data;
    _errorMessage;
    _sucessMessage;

    render(data) {
        this._data = data;
        const markUp = this._generateMarkUp();
        this._insertMarkUp('afterbegin', markUp);
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    _insertMarkUp(position, markUp) {
        this._clear();
        this._parentElement.insertAdjacentHTML(position, markUp);
    }

    renderSpinner() {
        const markUp = `<div class="spinner">
            <svg>
             <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
      
        this._insertMarkUp('afterbegin', markUp);
    }

    renderError(message = this._errorMessage) {
        const errMarkUp = `
        <div class="error">
            <div>
            <svg>
                <use href="${icons}#icon-alert-triangle"></use>
            </svg>
            </div>
            <p>${message}</p>
        </div>`;

        this._insertMarkUp('afterbegin', errMarkUp);
    }

    renderMessage(message = this._sucessMessage) {
        const markUp = `
        <div class="message">
            <div>
            <svg>
                <use href="${icons}#icon-smile"></use>
            </svg>
            </div>
            <p>${message}</p>
        </div>`;

        this._insertMarkUp('afterbegin', markUp);
    }
}