import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._form = this.popup.querySelector('.popup__form')
    this._options = this.popup.querySelectorAll('input[name="radioButton"]')
  }

  _isChecked = () => {
    this._options.forEach((option) => {
      option.addEventListener('click', () => {
        return option
      })
    })
  }

  setEventListeners() {
    super.setEventListeners()
    this._isChecked()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.close()
    })
  }
}