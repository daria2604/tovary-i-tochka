import DeliveryPopup from "../scripts/DeliveryPopup.js";
import PaymentPopup from "../scripts/PaymentPopup.js";
import  {items }from "../scripts/data/items.js";
import FormValidation from "../scripts/FormValidation.js";
import { settings } from "../scripts/FormValidation.js";
import Item from "../scripts/Item.js";

const cartForm = document.querySelector('.form')
const itemTemplate = document.querySelector('#itemTemplate');

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

const validator = new FormValidation(settings, cartForm)
const paymentPopup = new PaymentPopup({ popupSelector: '.popup_type_payment' })
const deliveryPopup = new DeliveryPopup({ popupSelector: '.popup_type_delivery' })

items.forEach((itemData) => {
  const itemEl = new Item(itemData, itemTemplate);
  cartItemList.appendChild(itemEl.renderItem());
});

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

validator.enableValidation()