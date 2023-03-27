import icons from 'url:../../img/icons.svg';
import View from "./view";

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    _generateMarkUp() {
        const totalPages = Math.ceil(this._data.results.length / this._data.pageSize);
        const currPage = this._data.currentPage;

        if(currPage === 1 && currPage < totalPages)
            return `${this.#generateLastMark(totalPages)}${this.#generateMarkUpNext(currPage)}`;

        if(currPage === totalPages && totalPages > 1)
            return `${this.#generateFirstMark()}${this.#generateMarkUpPrev(currPage)}`;
            
        if(currPage > 1 && currPage < totalPages)
            return `${this.#generateFirstMark()}${this.#generateMarkUpPrev(currPage)} ${this.#generateLastMark(totalPages)}${this.#generateMarkUpNext(currPage)}`   

        //Only single page    
        return ''    
    }

    #generateMarkUpPrev(currPage) {
        return `<button data-page="${currPage - 1}" class="btn--inline pagination__btn--prev">
            <span>Page ${currPage - 1}</span>
        </button>`;
    }

    #generateMarkUpNext(currPage) {
        return `<button data-page="${currPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
        </button>`;
    }

    #generateLastMark(total) {
        return `<button data-page="${total}" class="btn--inline pagination__btn--next">
            <svg class="search__icon">
            <use href="${icons}#icon-last-entry"></use>
            </svg>
        </button>`;
    }

    #generateFirstMark() {
        return `<button data-page="1" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-first-entry"></use>
            </svg>
        </button>`;
    }

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', e => {
           const btn = e.target.closest('.btn--inline');
           if(!btn) return;

           handler(+btn.dataset.page);
        })
    }
}

export default new PaginationView();