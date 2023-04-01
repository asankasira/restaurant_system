class HomeView {
    _logo = document.querySelector('.header__logo');

    constructor() {
        this._registerEvents();
    }

    _registerEvents() {
        this._logo.addEventListener('click', () => window.location.assign(window.location.origin))
    }

    addHandlerLoad(handler) {
        window.addEventListener('load', handler);
    }
}

export default new HomeView();