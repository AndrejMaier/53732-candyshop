'use strict';

// Число карточек
var numberCards = 26;

// Название продуктов
var namesProduct = [
  'Чесночные сливки',
  'Огуречный педант',
  'Молочная хрюша',
  'Грибной шейк',
  'Баклажановое безумие',
  'Паприколу итальяно',
  'Нинзя-удар васаби',
  'Хитрый баклажан',
  'Горчичный вызов',
  'Кедровая липучка',
  'Корманный портвейн',
  'Чилийский задира',
  'Беконовый взрыв',
  'Арахис vs виноград',
  'Сельдерейная душа',
  'Початок в бутылке',
  'Чернющий мистер чеснок',
  'Раша федераша',
  'Кислая мина',
  'Кукурузное утро',
  'Икорный фуршет',
  'Новогоднее настроение',
  'С пивком потянет',
  'Мисс креветка',
  'Бесконечный взрыв',
  'Невинные винные',
  'Бельгийское пенное',
  'Острый язычок'
];

// Из чего состоят продукты
var contentsProduct = [
  'молоко',
  'сливки',
  'вода',
  'пищевой краситель',
  'патока',
  'ароматизатор бекона',
  'ароматизатор свинца',
  'ароматизатор дуба, идентичный натуральному',
  'ароматизатор картофеля',
  'лимонная кислота',
  'загуститель',
  'эмульгатор',
  'консервант: сорбат калия',
  'посолочная смесь: соль, нитрит натрия',
  'ксилит',
  'карбамид',
  'вилларибо',
  'виллабаджо'
]

// Массив содержащий название файлов картинок
var namesPicture = [
  'gum-cedar.jpg',
  'gum-chile.jpg',
  'gum-eggplant.jpg',
  'gum-mustang.jpg',
  'gum-portwine.jpg',
  'gum-wasabi.jpg',
  'ice-cucumber.jpg',
  'ice-mushroom.jpg',
  'ice-pig.jpg',
  'marmalade-beer.jpg',
  'marmalade-caviar.jpg',
  'marmalade-corn.jpg',
  'marmalade-new-year.jpg',
  'marmalade-sour.jpg',
  'marshmallow-bacon.jpg',
  'marshmallow-beer.jpg',
  'marshmallow-shrimp.jpg',
  'marshmallow-spicy.jpg',
  'marshmallow-wine.jpg',
  'soda-bacon.jpg',
  'soda-celery.jpg',
  'soda-cob.jpg',
  'soda-garlic.jpg',
  'soda-peanut-grapes.jpg',
  'soda-russian.jpg'
];

// Функция генерации случайного числа
var getRandomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min +1) + min);
}

// Функция выбора случайного значения из массива
var getRandomValueArr = function(arr) {
  var randomValueArr = Math.floor(Math.random() * arr.length);
  return randomValueArr;
};

//Функция выбора случайного колличества значений из массива
var getRandomAmountValueArr = function(arr) {
  var copyArr = arr.slice();
  var newArr = [];
  var itemCount = getRandomValueArr(copyArr);
  itemCount = itemCount > 0 ? itemCount : 1;
  for (var i = 0; i < itemCount; i++) {
    var randomValue = getRandomValueArr(copyArr);
    newArr.push(copyArr[randomValue]);
    copyArr.splice(randomValue, 1);
  }
  return newArr;
};

// Функция создании объекта с данными карточки товара
var generateCard = function() {
  var product = {
    nameProduct: namesProduct[getRandomValueArr(namesProduct)],
    pictureUrl: 'img/'+ namesPicture[getRandomValueArr(namesPicture)],
    amount: getRandomNumber(0, 20),
    price: getRandomNumber(100, 1500),
    weight: getRandomNumber(30, 300),
    rating: {
      value: getRandomNumber(1, 5),
      number: getRandomNumber(10, 900),
    },
    nutritionFacts: {
      sugar: getRandomNumber(0, 1),
      energy: getRandomNumber(70, 500),
      contents: getRandomAmountValueArr(contentsProduct),
    }
  };
  return product;
};

console.log(generateCard());