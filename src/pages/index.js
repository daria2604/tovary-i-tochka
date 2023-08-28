import DeliveryPopup from "../scripts/DeliveryPopup.js";
import PaymentPopup from "../scripts/PaymentPopup.js";
import Counter from "../scripts/Counter.js";
import  {items }from "../scripts/data/items.js";

const cartAccordionButton = document.querySelector('.cart__accordion-button')
const cartItemList = document.querySelector('.cart__items')
const absentCartAccordionButton = document.querySelector('.cart__accordion-button_type_absent')
const absentItemList = document.querySelector('.cart__items_type_absent')
const deliveryOrderTooltip = document.querySelector('.tooltip_type_delivery')
const deliveryCartTooltip = document.querySelector('.tooltip_type_delivery-cart')
const freeDeliveryCartInfo = document.querySelector('.shipping__text-accent')
const freeDeliveryOrderInfo = document.querySelector('.order__shipping-accent')
const paymentNowCheckbox = document.querySelector('#orderPaymentCheckbox')
const paymentCaption = document.querySelector('.order__payment-caption')
const orderSubmitButton = document.querySelector('.order__submit-button')
const orderSum = document.querySelector('.order__heading-sum')
 
const paymentEditButton = document.querySelector('.payment__edit-button')
const paymentEditIcon = document.querySelector('.order__payment-edit')
const deliveryEditIcon = document.querySelector('.order__delivery-edit')
const deliveryEditButton = document.querySelector('.delivery__edit-button')

cartAccordionButton.addEventListener('click', () => {
  cartItemList.classList.toggle('cart__items_closed')
  cartAccordionButton.classList.toggle('cart__accordion-button_rotate')
})

absentCartAccordionButton.addEventListener('click', () => {
  absentItemList.classList.toggle('cart__items_closed')
  absentCartAccordionButton.classList.toggle('cart__accordion-button_rotate')
})

// всплывающая подсказка при наведении на "бесплатно" в корзине
freeDeliveryCartInfo.addEventListener('mouseenter', () => {
  deliveryCartTooltip.classList.add('tooltip_visible')
})

freeDeliveryCartInfo.addEventListener('mouseleave', () => {
  deliveryCartTooltip.classList.remove('tooltip_visible')
})

// всплывающая подсказка при наведении на "бесплатно" в блоке с заказом
freeDeliveryOrderInfo.addEventListener('mouseenter', () => {
  deliveryOrderTooltip.classList.add('tooltip_visible')
})

freeDeliveryOrderInfo.addEventListener('mouseleave', () => {
  deliveryOrderTooltip.classList.remove('tooltip_visible')
})

paymentNowCheckbox.addEventListener('change', () => {
  paymentCaption.classList.toggle('payment__caption_hidden')
  if(paymentNowCheckbox.checked) {
    orderSubmitButton.textContent = `Оплатить ${orderSum.textContent}`
  } else {
    orderSubmitButton.textContent = 'Заказать'
  }
})

const paymentPopup = new PaymentPopup({ popupSelector: '.popup_type_payment' })
const deliveryPopup = new DeliveryPopup({ popupSelector: '.popup_type_delivery' })

paymentEditButton.addEventListener('click', () => {
  paymentPopup.open()
})
paymentEditIcon.addEventListener('click', () => {
  paymentPopup.open()
})
deliveryEditButton.addEventListener('click', () => {
  deliveryPopup.open()
})
deliveryEditIcon.addEventListener('click', () => {
  deliveryPopup.open()
})

paymentPopup.setEventListeners()
deliveryPopup.setEventListeners()


const counter = new Counter(items[0])
counter.setEventListeners()

// const showInputLabel = (label, activeInputLabelClass) => {
//   label.classList.add(activeInputLabelClass)
// }

// const hideInputLabel = (label, activeInputLabelClass) => {
//   label.classList.remove(activeInputLabelClass)
// }

// const isFocused = (input, inputLabelTemplate, activeInputLabelClass) => {
//   const label = document.querySelector(`${inputLabelTemplate}${input.name}`)

//   if((label.style.visibility = 'hidden')) {
//     console.log('yes')
//     showInputLabel(label, activeInputLabelClass)
//   } else {
//     console.log('no')
//     hideInputLabel(label, activeInputLabelClass)
//   }
// }

const showInputeError = (input, errorText, activeErrorClass, invalidInputClass) => {
  errorText.classList.add(activeErrorClass);
  input.classList.add(invalidInputClass);
}

const hideInputeError = (input, errorText, activeErrorClass,invalidInputClass) => {
  errorText.classList.remove(activeErrorClass)
  input.classList.remove(invalidInputClass)
}

const checkInputValidity = (input, errroClassTemplate, activeErrorClass, invalidInputClass) => {
  const errorText = document.querySelector(`${errroClassTemplate}${input.name}`)

  switch (input.name) {
    case 'name':
    case 'surname':
      if (!input.value) {
        showInputeError(input, errorText, activeErrorClass, invalidInputClass)
      } else {
        hideInputeError(input, errorText, activeErrorClass,invalidInputClass)
      }
      break;

    case 'email':
      if (!input.value) {
        errorText.textContent = 'Укажите электронную почту';
        showInputeError(input, errorText, activeErrorClass, invalidInputClass)
      } else if (!input.validity.valid) {
        errorText.textContent = 'Проверьте адрес электронной почты';
        showInputeError(input, errorText, activeErrorClass, invalidInputClass)
      } else {
        hideInputeError(input, errorText, activeErrorClass,invalidInputClass)
      }
      break;

      case 'telephone':
        if (!input.value) {
          errorText.textContent = 'Укажите номер телефона';
          showInputeError(input, errorText, activeErrorClass, invalidInputClass)
        } else if (!input.validity.valid) {
          errorText.textContent = 'Формат: +9 999 999 99 99';
          showInputeError(input, errorText, activeErrorClass, invalidInputClass)
        } else {
          hideInputeError(input, errorText, activeErrorClass,invalidInputClass)
        }
        break;

      case 'inn':
        if (!input.value) {
          errorText.textContent = 'Укажите ИНН';
          errorText.style.color = '#F55123';
          showInputeError(input, errorText, activeErrorClass, invalidInputClass)
        } else if (input.value !== 14) {
          errorText.textContent = 'Проверьте ИНН';
          errorText.style.color = '#F55123';
          showInputeError(input, errorText, activeErrorClass, invalidInputClass)
        } else {
          hideInputeError(input, errorText, activeErrorClass,invalidInputClass)
        }
        break;

      default:
        break;
  }
}

const hasInvalidInput = (inputList) => {
  return Array.from(inputList).some((input) => !input.validity.valid)
}

const setEventListeners = (form, inputList, errroClassTemplate, activeErrorClass, invalidInputClass) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault()
    
  })

  inputList.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(input, errroClassTemplate, activeErrorClass, invalidInputClass);
    })
  }) 
}

const enableValidation = (config) => {
  const form = document.forms.cartForm;
  const inputList = Array.from(form.querySelectorAll(config.inputListSelector))
  const submitButton = form.querySelector(config.submitButtonSelector)

  setEventListeners(form, inputList, config.errroClassTemplate, config.activeErrorClass, config.invalidInputClass)
}

enableValidation({
  inputListSelector: '.receiver__input-field',
  errroClassTemplate: '.error_type_',
  activeErrorClass: 'error_active',
  invalidInputClass: 'receiver__input-field_type_error',
  inputLabelTemplate: '.receiver__label_type_',
  activeInputLabelClass: 'receiver__label_active',
  submitButtonSelector: '.order__submit-button',
});