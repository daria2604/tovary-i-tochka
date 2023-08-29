export default class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector)
    this._closeButton = this.popup.querySelector('.popup__close')
  }

  open() {
    this.popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this.popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose = (evt) => {
    if(evt.key === 'Escape') {
      this.close()
    }
  }

  _handleOverlayClose = (evt) => {
    if(evt.target.classList.contains('popup_opened')) {
      this.close()
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      if(this.popup.classList.contains('popup_opened')) {
        this.close()
      }
    })
    document.addEventListener('mousedown', this._handleOverlayClose)
  }
}