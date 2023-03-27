import icons from 'url:../../img/icons.svg';
import View from './view'

class ResultsView extends View {
    _parentElement = document.querySelector('ul.results');

    _generateMarkUp() {
        return this._data.map(this.#generateMarkUpPreview).join('\n');
    }

    _clear() {
        super._clear();
        this._parentElement.previousElementSibling.innerHTML = '';
    }

    #generateMarkUpPreview(pre) {
        return `<li class="preview">
            <a class="preview__link" href="#${pre.id}">
            <figure class="preview__fig">
                <img src="${pre.image}" alt="Test" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${pre.title}</h4>
                <p class="preview__publisher">${pre.publisher}</p>
                <div class="preview__user-generated">
                <svg>
                    <use href="${icons}#icon-user"></use>
                </svg>
                </div>
            </div>
            </a>
        </li>`
    }

    selectPreview(id) {
        this._parentElement.querySelectorAll('a.preview__link')
                ?.forEach(e => e.classList.remove('preview__link--active'));

        if(!id) return;

        const prevElement = document.querySelector(`a[href="#${id}"]`);
        prevElement && prevElement.classList.add('preview__link--active');
    }

    addHandlerSelect(handler) {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash;
            handler(hash.slice(1));
        });
    }
}

export default new ResultsView();