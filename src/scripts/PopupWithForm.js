import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._form = this.popup.querySelector('.popup__form')
    this._options = this.popup.querySelectorAll('input[name="radioButton"]')
    this._address = this.popup.querySelector('.radio__text')
  }

  _isChecked = () => {
    for (const option of this._options) {
      if (option.checked) {
       return option.value
      }
    }
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.close()
    })
  }
}