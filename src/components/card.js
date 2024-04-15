// Функция создания карточки
export const createCard = function (
  cardImage,
  cardTitle,
  removeCard,
  openImage,
  likeCard
) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImageElement = cardElement.querySelector('.card__image');

  cardImageElement.setAttribute('src', cardImage);
  cardImageElement.setAttribute('alt', `Фотография ${cardTitle}`);
  cardElement.querySelector('.card__title').textContent = cardTitle;

  const deleteButton = cardElement.querySelector('.card__delete-button');

  deleteButton.addEventListener('click', removeCard);
  cardImageElement.addEventListener('click', openImage);
  cardElement.addEventListener('click', likeCard);

  return cardElement;
};

// Функция удаления карточки
export const removeCard = function (evt) {
  evt.target.parentElement.remove();
};

// Функция лайка карточки
export const likeCard = function (evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
};
