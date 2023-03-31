import PreviewView from './previewView';

class BookMarkView extends PreviewView {
    _parentElement = document.querySelector('ul.bookmarks__list');
}

export default new BookMarkView();