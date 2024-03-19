// @todo: Темплейт карточки

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
const createCard = function (cardImage, cardTitle, removeCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImageElement = cardElement.querySelector('.card__image');

  cardImageElement.setAttribute('src', cardImage);
  cardImageElement.setAttribute('alt', `Фотография ${cardTitle}`);
  cardElement.querySelector('.card__description').textContent = cardTitle;

  const deleteButton = cardElement.querySelector('.card__delete-button');

  deleteButton.addEventListener('click', removeCard);

  return cardElement;
};
// @todo: Функция удаления карточки
const removeCard = function (evt) {
  evt.target.parentElement.remove();
};
// @todo: Вывести карточки на страницу
for (const card of initialCards) {
  cardsContainer.append(createCard(card.link, card.name, removeCard));
}
