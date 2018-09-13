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
];

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
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Функция выбора случайного значения из массива
var getRandomValueArr = function(arr) {
  var randomValueArr = Math.floor(Math.random() * arr.length);
  return randomValueArr;
};

// Функция выбора случайного колличества значений из массива
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

// Функция создания массива из объектов карточки товара
var generateCards = function(amount) {
  var arrCards = [];
  for (var i = 0; i < amount; i++) {
    var createCard = generateCard();
    arrCards.push(createCard);
  }
  return arrCards;
};

var cardsData = generateCards(numberCards);

// Задание номер 2 лекции 3

var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');

var catalogLoad = document.querySelector('.catalog__load');
catalogLoad.classList.add('visually-hidden');

// Заполняем карточку данными
var createCard = function(numberCard) {
  var templateCard = document.querySelector('#card').content.querySelector('.catalog__card').cloneNode(true);
  templateCard.querySelector('.card__title').textContent = numberCard.nameProduct;
  templateCard.querySelector('.card__img').src = numberCard.pictureUrl;
  
  if (numberCard.amount >= 1 && numberCard.amount <= 5) {
    templateCard.querySelector('.catalog__card').classList.remove('card--in-stock');
    templateCard.querySelector('.catalog__card').classList.add('card--little');
  } else if (numberCard.amount === 0) {
    templateCard.querySelector('.catalog__card').classList.remove('card--in-stock');
    templateCard.querySelector('.catalog__card').classList.add('card--soon');
  }
  
  templateCard.querySelector('.card__price').firstChild.textContent = numberCard.price;
  templateCard.querySelector('.card__weight').textContent = '/ ' + numberCard.weight;
  
  if (numberCard.nutritionFacts.sugar === true) {
    templateCard.querySelector('.card__characteristic').textContent = 'Содержит сахар. ' + numberCard.nutritionFacts.energy + ' калл';
  } else {
    templateCard.querySelector('.card__characteristic').textContent = 'Без сахара. ' + numberCard.nutritionFacts.energy + ' калл';
  }
  
  templateCard.querySelector('.card__composition-list').textContent = numberCard.nutritionFacts.contents;
  
  var ratings = ['one', 'two', 'three', 'four', 'five'];
  var rating = 'stars__rating--' + ratings[numberCard.rating.value - 1];
  
  if (numberCard.rating.value !== 5) {
      cardElement.querySelector('.stars__rating').classList.remove('stars__rating--five');
      cardElement.querySelector('.stars__rating').classList.add(rating);
      cardElement.querySelector('.stars__rating').textContent = 'Рейтинг: ' + numberCard.rating.value + ' звёзд';
  }
  
  return templateCard;
};

// Добавляет карточку товара на сайт
  var addWebsite = function(amountArrs, appendTo, renderCard) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < amountArrs.length; i++) {
      fragment.appendChild(renderCard(amountArrs[i]));
    }
    appendTo.appendChild(fragment);
  };

addWebsite(cardsData, catalogCards, createCard);
