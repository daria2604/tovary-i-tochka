export default class FormValidation {
  constructor(config, form) {
    this._form = form
    this._inputSelector = config.inputSelector
    this._errorClassTemplate = config.errorClassTemplate
    this._activeErrorClass = config.activeErrorClass
    this._invalidInputClass = config.invalidInputClass
    this._inputLabelTemplate = config.inputLabelTemplate
    this._activeInputLabelClass = config.activeInputLabelClass
    this._submitButtonSelector = config.submitButtonSelector
    this._telephoneInputSelector = config.telephoneInputSelector
    this._telephoneInput = this._form.querySelector(this._telephoneInputSelector)
    this._submitButton = this._form.querySelector(this._submitButtonSelector)
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector))
  }

  _showLabel(input) {
    this._label = this._form.querySelector(`${this._inputLabelTemplate}${input.name}`)
    this._label.classList.add(this._activeInputLabelClass)
  }

  _hideLabel(input) {
    this._label = this._form.querySelector(`${this._inputLabelTemplate}${input.name}`)
    this._label.classList.remove(this._activeInputLabelClass)
  }

  _showInputError(input) {
    this._errorText = this._form.querySelector(`${this._errorClassTemplate}${input.name}`)
    this._errorText.classList.add(this._activeErrorClass);
    input.classList.add(this._invalidInputClass);
  }

  _hideInputError(input) {
    this._errorText = this._form.querySelector(`${this._errorClassTemplate}${input.name}`)
    this._errorText.classList.remove(this._activeErrorClass);
    input.classList.remove(this._invalidInputClass);
  }

  _isFocused(input) {
    input.addEventListener('input', () => {
      this._showLabel(input)
      
      if(!input.value) {
        this._hideLabel(input)
      }
    })
  }

  _formatPhoneNumber() {
    this._telephoneInput.addEventListener('input', () => {
      this._number = this._telephoneInput.value
      this._number = this._number.replace(/\D/g, '')
      this._number = this._number.slice(0, 30);

      this._formattedNumber = '+'

      for (let i = 0; i < this._number.length; i++) {
        if (i === 1) {
          this._formattedNumber += ' ';
        } else if (i === 4 || i === 7 || i === 9 || i === 11) {
          this._formattedNumber += ' ';
        }
    
        this._formattedNumber += this._number[i];
      }

      this._telephoneInput.value = this._formattedNumber
    })
  }

  _checkInputValidity(input) {
    this._errorText = this._form.querySelector(`${this._errorClassTemplate}${input.name}`)

    switch (input.name) {
      case 'name': if (!input.value) {
        this._errorText.textContent = 'Укажите имя';
        this._showInputError(input)
      } else {
        this._hideInputError(input)
        this._errorText.textContent = ' ';
      }
      break;

      case 'surname':
        if (!input.value) {
          this._errorText.textContent = 'Введите фамилию';
          this._showInputError(input)
        } else {
          this._hideInputError(input)
          this._errorText.textContent = ' ';
        }
        break;
  
      case 'email':
        if (!input.value) {
          this._errorText.textContent = 'Укажите электронную почту';
          this._showInputError(input)
        } else if (!input.validity.valid) {
          this._errorText.textContent = 'Проверьте адрес электронной почты';
          this._showInputError(input)
        } else {
          this._hideInputError(input)
          this._errorText.textContent = ' ';
        }
        break;
  
        case 'telephone':
          if (!input.value) {
            this._errorText.textContent = 'Укажите номер телефона';
            this._showInputError(input)
          } else if (!/^\+\d{1}\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/.test(input.value)) {
            this._errorText.textContent = 'Формат: +9 999 999 99 99';
            this._showInputError(input)
          } else {
            this._hideInputError(input)
            this._errorText.textContent = ' ';
          }
          break;
  
        case 'inn':
          if (!input.value) {
            this._errorText.textContent = 'Укажите ИНН';
            this._errorText.style.color = '#F55123';
            this._showInputError(input)
          } else if (input.value.length !== 14) {
            this._errorText.textContent = 'Проверьте ИНН';
            this._errorText.style.color = '#F55123';
            this._showInputError(input)
          } else {
            this._hideInputError(input)
            this._errorText.textContent = ' ';
          }
          break;
  
        default:
          break;
    }
  }

  _showValidationResult() {
    this._inputList.forEach((input) => {
      this._checkInputValidity(input);
    });
  }

  _setFocus() {
    this._inputList.forEach((input) => {
      this._isFocused(input)
    })
  }

  enableValidation() {
    this._submitButton.addEventListener('click', () => {
      this._showValidationResult()
    })
    
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      console.log('Form is valid and submitted!')
    })

    this._setFocus()
    this._formatPhoneNumber()
  }
}

export const settings = {
  inputSelector: '.receiver__input-field',
  errorClassTemplate: '.error_type_',
  activeErrorClass: 'error_active',
  invalidInputClass: 'receiver__input-field_type_error',
  inputLabelTemplate: '.receiver__label_type_',
  activeInputLabelClass: 'receiver__label_active',
  submitButtonSelector: '.order__submit-button',
  telephoneInputSelector: '.receiver__input-field_type_telephone',
}