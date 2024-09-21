import Views from './Views.js'
import icons from 'url:../../img/icons.svg';

class PaginationView extends Views {
    _parentElement = document.querySelector('.pagination');

    _generateMarkup() {
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        const currPage = this._data.page;

        if (currPage === 1 && numPages > 1) {
            return this._generateNextBtnMarkup();
        }

        if (currPage === numPages && numPages > 1) {
            return this._generatePrevBtnMarkup()
        }

        if (currPage < numPages) {
            return this._generatePrevBtnMarkup() + this._generateNextBtnMarkup();

        }
    }

    _generateNextBtnMarkup() {
        return `
                <button data-goto="${this._data.page + 1}" class="btn--inline pagination__btn--next">
                    <span>Page ${this._data.page + 1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `
    }

    _generatePrevBtnMarkup() {
        return `
                <button data-goto="${this._data.page - 1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${this._data.page - 1}</span>
                </button>
            `
    }

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function (event) {
            const button = event.target.closest('.btn--inline');

            if (!button) return;

            const goToPage = +button.dataset.goto;
            handler(goToPage);
        })
    }
}


export default new PaginationView();