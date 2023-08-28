import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  #form
  #options
  #address

  constructor(popupSelector) {
    super(popupSelector)
    // this.#handleFormSubmit = handleFormSubmit
    this.#form = this.popup.querySelector('.popup__form')
    this.#options = this.popup.querySelectorAll('input[name="radioButton"]')
    this.#address = this.popup.querySelector('.radio__text')
  }

  #isChecked = () => {
    for (const option of this.#options) {
      if (option.checked) {
       return option.value
      }
    }
  }

  setEventListeners() {
    super.setEventListeners()
    this.#form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log(this.#isChecked())
      console.log('works')
      // this.#handleFormSubmit(this.#getInputValues())
      //   .then(() => this.close())
      //   .catch(() => console.error)
    })
  }
}