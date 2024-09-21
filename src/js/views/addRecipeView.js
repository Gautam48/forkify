import Views from './Views.js'

class AddRecipeView extends Views {
    _parentElement = document.querySelector('.upload');

    _window = document.querySelector(".add-recipe-window");
    _overlay = document.querySelector(".overlay");
    _btnOpen = document.querySelector(".nav__btn--add-recipe");
    _btnClose = document.querySelector(".btn--close-modal")

    constructor() {
        super();
        this.addHandlerShowWindow();
        this.addHandlerCloseWindow();
    }

    toggleWindow() {
        this._window.classList.toggle("hidden");
        this._overlay.classList.toggle("hidden");
    }

    addHandlerShowWindow() {
        this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
    }

    addHandlerCloseWindow() {
        this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
        this._overlay.addEventListener("click", this.toggleWindow.bind(this));
    }

    addHandlerUpload(handler) {
        this._parentElement.addEventListener("submit", function (event) {
            event.preventDefault();
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            handler(data);
        })
    }

    remakeUploadForm() {

        this._parentElement.insertAdjacentHTML("afterbegin", this._generateMarkup);
    }

    _generateMarkup() {
        const markup = `
        <div class="upload__column">
        <h3 class="upload__heading">Recipe data</h3>
        <label>Title</label>
        <input value="TEST23" required name="title" type="text" />
        <label>URL</label>
        <input value="TEST23" required name="sourceUrl" type="text" />
        <label>Image URL</label>
        <input value="TEST23" required name="image" type="text" />
        <label>Publisher</label>
        <input value="TEST23" required name="publisher" type="text" />
        <label>Prep time</label>
        <input value="23" required name="cookingTime" type="number" />
        <label>Servings</label>
        <input value="23" required name="servings" type="number" />
      </div>`

        return markup;
    }


}

export default new AddRecipeView();