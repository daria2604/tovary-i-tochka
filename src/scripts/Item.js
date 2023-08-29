export default class Item {
  constructor(data, template) {
    this._data = data;
    this._template = template;
    this._image = data.image;
    this._name = data.name;
    this._color = data.color;
    this._size = data.size;
    this._price = data.newPrice;
    this._warehouse = data.warehouse;
    this._seller = data.seller.name;
    this._quantity = data.quantity;
    this._total = document.querySelector('.order__total-sum')

    this._count = 0;
    this._totalSum = 0;
  }

  _getTemplate() {
    this._emptyItem = this._template.content.querySelector('.item').cloneNode(true);
    return this._emptyItem.cloneNode(true);
  }

  _toggleLike() {
    this._likeButton.classList.toggle('like-icon_active');
  }

  _deleteItem() {
    this._item.remove();
    this._item = null;
  }

  _showSellerTooltip() {
    this._sellerTooltip.classList.add('tooltip_visible');
  }

  _hideSellerTooltip() {
    this._sellerTooltip.classList.remove('tooltip_visible');
  }

  _showDiscountTooltip() {
    this._discountTooltip.classList.add('tooltip_visible');
  }

  _hideDiscountTooltip() {
    this._discountTooltip.classList.remove('tooltip_visible');
  }

  _updateCount() {
    this._countElement.value = this._count;
  }

  _updateSum() {
    this._sumElement.textContent = this._totalSum;
    this._total.textContent = this._totalSum
  }

  _checkStock() {
    if (this._count < 1) {
      this._removeButton.disabled = true;
    } else {
      this._removeButton.disabled = false;
    }

    if (this._quantity < 1) {
      this._addButton.disabled = true;
    } else {
      this._addButton.disabled = false;
    }
  }

  _addItem() {
    this._count++;
    this._quantity--;
    this._totalSum = this._count * this._price;
    this._countElement.value = this._count;
    this._updateSum();
    this._checkStock();
  }

  _removeItem() {
    this._count--;
    this._quantity++;
    this._totalSum = this._count * this._price;
    this._countElement.value = this._count;
    this._updateSum();
    this._checkStock();
  }

  _setEventListeners() {
    this._likeButton = this._item.querySelector('.like-icon');
    this._deleteButton = this._item.querySelector('.delete-icon');
    this._sellerInfoIcon = this._item.querySelector('.item__seller-about');
    this._oldPrice = this._item.querySelector('.item__price-old')
    this._sellerTooltip = this._item.querySelector('.tooltip_type_store');
    this._discountTooltip = this._item.querySelector('.tooltip_type_discount');
    this._removeButton = this._item.querySelector('.counter__minus')
    this._addButton = this._item.querySelector('.counter__plus')

    this._likeButton.addEventListener('click', this._toggleLike.bind(this));
    this._deleteButton.addEventListener('click', this._deleteItem.bind(this));
    this._sellerInfoIcon.addEventListener('mouseover', this._showSellerTooltip.bind(this));
    this._sellerInfoIcon.addEventListener('mouseout', this._hideSellerTooltip.bind(this));
    this._oldPrice.addEventListener('mouseover', this._showDiscountTooltip.bind(this));
    this._oldPrice.addEventListener('mouseout', this._hideDiscountTooltip.bind(this));
    this._addButton.addEventListener('click', this._addItem.bind(this));
    this._removeButton.addEventListener('click', this._removeItem.bind(this));

  }

  renderItem() {
    this._item = this._getTemplate();

    this._itemImage = this._item.querySelector('.item__preview-image');
    this._itemImage.src = this._image;
    this._itemImage.alt = this._name;
    this._itemName = this._item.querySelector('.item__name');
    this._itemName.textContent = this._name;
    this._itemColor = this._item.querySelector('.item__color');
    this._itemSize = this._item.querySelector('.item__size'); 
    this._itemSizeMobile = this._item.querySelector('.item__preview-size');   
    this._itemPrice = this._item.querySelector('.item__price-new');
    this._itemPrice.textContent = this._price;
    this._itemWarehouse = this._item.querySelector('.item__warehouse');
    this._itemWarehouse.textContent = this._warehouse;
    this._itemSeller = this._item.querySelector('.item__seller-name');
    this._itemSeller.textContent = this._seller;
   
    this._messageElement = this._item.querySelector('.item__counter-left');
    this._countElement = this._item.querySelector('.counter__number');
    this._sumElement = this._itemPrice;

    if(this._size) {
      this._itemSize.textContent = `Размер: ${this._size}`;
      this._itemSizeMobile.textContent = this._size
    } else {
      this._itemSize.textContent = '';
      this._itemSizeMobile.style.display = 'none'
    }

    if(this._color) {
      this._itemColor.textContent = `Цвет: ${this._color}`;
    } else {
      this._itemColor.textContent = '';
    }

    if (this._quantity <= 2) {
      this._messageElement.textContent = 'Осталось 2 шт.';
    } 

    this._setEventListeners();
    return this._item;
  }
}