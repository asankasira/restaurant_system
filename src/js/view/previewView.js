import icons from 'url:../../img/icons.svg';
import View from './view';

export default class PreviewView extends View {

    _generateMarkUp() {
        return this._data.map(this.#generateMarkUpPreview).join('\n');
    }

    #generateMarkUpPreview(pre) {
        const hash = window.location.hash;
        const id = hash.slice(1);

        return `<li class="preview">
            <a class="preview__link ${pre.id === id ? 'preview__link--active' : ''}" href="#${pre.id}">
            <figure class="preview__fig">
                <img src="${pre.image}" alt="${pre.title}" />
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
        document.querySelectorAll('a.preview__link')
                ?.forEach(e => e.classList.remove('preview__link--active'));

        if(!id) return;

        const prevElements = document.querySelectorAll(`a[href="#${id}"]`);
        prevElements && prevElements.forEach(e => e.classList.add('preview__link--active'));
    }

    addHandlerSelect(handler) {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash;
            handler(hash.slice(1));
        });
    }

    fireHashChangeEvent(id) {
        window.location.hash = `#${id}`;
    }
}