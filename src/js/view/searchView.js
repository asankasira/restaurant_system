import View from "./view";

class SearchView extends View {
    _parentElement = document.querySelector('form.search');
    #searchInput = this._parentElement.querySelector('.search__field');

    _clear() {
        this.#searchInput.value = '';
    }

    addHandlerSearch(handler) {
        this._parentElement.addEventListener('submit', e => {
            e.preventDefault();
            handler(this.#searchInput.value);
            this._clear();
        })
    }
}

export default new SearchView();