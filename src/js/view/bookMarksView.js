import PreviewView from './previewView';

class BookMarkView extends PreviewView {
    _parentElement = document.querySelector('ul.bookmarks__list');
    #defaultDiv = this._parentElement.querySelector('.message');

    _insertMarkUp(position, markUp) {
        if(markUp) {
            super._insertMarkUp(position, markUp);
        }else {
            this._parentElement.innerHTML = this.#defaultDiv.outerHTML;
        }
    }
}

export default new BookMarkView();