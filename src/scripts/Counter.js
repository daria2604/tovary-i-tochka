export default class Counter {
  constructor(data) {
    this.data = data
    this.removeButton = document.querySelector('.counter__minus')
    this.addButton = document.querySelector('.counter__plus')
    this.totalNew = document.querySelector('.item__price-new')
    this.totalOld = document.querySelector('.item__price-old')
    this.totalItems = document.querySelector('.counter__number')
    this.totalItemsSum = document.querySelector('.order__info-sum')
    this.total = document.querySelector('.order__total-sum')
    this.amountLeft = data.amount
    this.newPrice = data.newPrice
    this.oldPrice = data.oldPrice
    this.currency = data.currency
  }
  
  updateTotal = () => {
    const sum = this.newPrice*(parseInt(this.totalItems.value))
    this.totalNew.textContent = sum
    this.totalItemsSum.textContent = sum + ' ' + this.currency
    this.total.textContent = sum
  }
  
  addItem = () => {
    this.addButton.addEventListener('click', () => {
      if(this.amountLeft === 0) {
        this.addButton.disabled = true
      }
      if(this.amountLeft > 0) {
        this.addButton.disabled = false
        this.totalItems.value++
        this.amountLeft--
        this.updateTotal()
      }
      
      console.log(this.amountLeft)
    })
  }

  removeItem = () => {
    this.removeButton.addEventListener('click', () => {
      if(this.amountLeft === 0) {
        this.removeButton.disabled = true
      } else {
        this.removeButton.disabled = false
        this.totalItems.value--
        this.amountLeft++
        this.updateTotal()
      }
    })
  }

  setEventListeners = () => {
    this.addItem()
  }
}