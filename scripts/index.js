// @todo: Темплейт карточки

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
const addCard = function (cardImage, cardTitle, removeCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').setAttribute('src', cardImage);
  cardElement.querySelector('.card__description').textContent = cardTitle;

  const deleteButton = cardElement.querySelector('.card__delete-button');

  deleteButton.addEventListener('click', removeCard);

  cardsContainer.append(cardElement);
};
// @todo: Функция удаления карточки
const removeCard = function (evt) {
  evt.target.parentElement.remove();
};
// @todo: Вывести карточки на страницу
for (const card of initialCards) {
  addCard(card.link, card.name, removeCard);
}
