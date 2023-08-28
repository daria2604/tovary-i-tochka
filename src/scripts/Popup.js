export default class Popup {
  #closeButton
  
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector)
    this.#closeButton = this.popup.querySelector('.popup__close')
  }

  open() {
    this.popup.classList.add('popup_opened')
    document.addEventListener('keydown', this.#handleEscClose)
  }

  close() {
    this.popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this.#handleEscClose)
  }

  #handleEscClose = (evt) => {
    if(evt.key === 'Escape') {
      this.close()
    }
  }

  #handleOverlayClose = (evt) => {
    if(evt.target.classList.contains('popup_opened')) {
      this.close()
    }
  }

  setEventListeners() {
    this.#closeButton.addEventListener('click', () => {
      if(this.popup.classList.contains('popup_opened')) {
        this.close()
      }
    })
    document.addEventListener('mousedown', this.#handleOverlayClose)
  }
}