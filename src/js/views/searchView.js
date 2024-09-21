class SearchView {
    _parentElement = document.querySelector('.search');

    _clearQuery() {
        this._parentElement.querySelector('.search__field').value = '';
        this._parentElement.querySelector('.search__field').blur();
    }

    getQuery() {
        const query = this._parentElement.querySelector('.search__field').value;
        this._clearQuery();
        return query
    }

    addHandlerSearch(handler) {
        this._parentElement.addEventListener('submit', function (event) {
            event.preventDefault();
            handler()
        })
    }
}

export default new SearchView();