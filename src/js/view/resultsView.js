import PreviewView from './previewView';

class ResultsView extends PreviewView {
    _parentElement = document.querySelector('ul.results');

    _clear() {
        super._clear();
        this._parentElement.previousElementSibling.innerHTML = '';
    }
}

export default new ResultsView();