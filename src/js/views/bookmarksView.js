import Views from './Views.js'
import previewView from './previewView.js';

class BookmarksView extends Views {
    _parentElement = document.querySelector('.bookmarks__list');

    _generateMarkup() {
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('')
    }

    addHandlerRender(handler) {
        window.addEventListener('load', handler);
    }
}

export default new BookmarksView();