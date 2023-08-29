import tshirtImg from '../../images/tshirt.jpeg'
import phonecaseImg from '../../images/phonecase.jpeg'
import colorPencilsImg from '../../images/color-pencils.jpeg'

export const items = [
  {
    _id: 1,
    image: tshirtImg,
    name: 'Футболка UZcotton мужская',
    color: 'белый',
    size: 56,
    warehouse: 'Коледино WB',
    seller: {
      name: 'OOO Вайлдберриз',
      number: 'ОГРН: 555555555555',
      address: '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34'
    },
    newPrice: 522,
    oldPrice: 1051,
    currency: 'сом',
    discount: {
      regularDiscount: '55%',
      customerDiscount: '10%',
    },
    quantity: 10,
  },
  {
    _id: 2,
    image: phonecaseImg,
    name: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
    color: 'прозрачный',
    warehouse: 'Коледино WB',
    seller: {
      name: 'OOO Мегапрофстиль',
      number: 'ОГРН: 5167746237148',
      address: '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34'
    },
    newPrice: 10500,
    oldPrice: 11500,
    currency: 'сом',
    discount: {
      regularDiscount: '55%',
      customerDiscount: '10%',
    },
    quantity: 500,
  },
  {
    _id: 3,
    image: colorPencilsImg,
    name: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell ',
    warehouse: 'Коледино WB',
    seller: {
      name: 'OOO Вайлдберриз',
      number: 'ОГРН: 555555555555',
      address: '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34'
    },
    newPrice: 247,
    oldPrice: 475,
    currency: 'сом',
    discount: {
      regularDiscount: '55%',
      customerDiscount: '10%',
    },
    quantity: 2,
  }
]