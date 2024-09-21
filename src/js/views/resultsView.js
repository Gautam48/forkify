import Views from './Views.js'
import previewView from './previewView.js';
// import icons from 'url:../../img/icons.svg';

class ResultsView extends Views {
  _parentElement = document.querySelector('.results');

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }

}

export default new ResultsView();