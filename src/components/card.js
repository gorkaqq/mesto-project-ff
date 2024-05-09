import { addLike, removeLike } from './api';

// Функция создания карточки
export const createCard = function (
  cardImage,
  cardTitle,
  removeCard,
  openImage,
  likeCard,
  cardId,
  userId,
  cardOwnerId,
  likeArray
) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImageElement = cardElement.querySelector('.card__image');
  const cardLikeCounterElement = cardElement.querySelector('.card__likes');
  const cardLikeButtonElement = cardElement.querySelector('.card__like-button');

  cardImageElement.setAttribute('src', cardImage);
  cardImageElement.setAttribute('alt', `Фотография ${cardTitle}`);
  cardElement.querySelector('.card__title').textContent = cardTitle;
  cardLikeCounterElement.textContent = likeArray.length;
  cardElement.id = cardId;

  const isLikedByUser = likeArray.some((user) => userId === user._id);
  if (isLikedByUser) {
    cardLikeButtonElement.classList.toggle('card__like-button_is-active');
  }

  const deleteButton = cardElement.querySelector('.card__delete-button');

  if (userId === cardOwnerId) {
    deleteButton.addEventListener('click', removeCard);
  } else {
    deleteButton.remove();
  }

  cardImageElement.addEventListener('click', openImage);
  cardElement.addEventListener('click', likeCard);

  return cardElement;
};

// Функция лайка карточки
export const likeCard = function (evt) {
  if (evt.target.classList.contains('card__like-button')) {
    if (!evt.target.classList.contains('card__like-button_is-active')) {
      addLike(evt.target.closest('.card').id)
        .then((card) => {
          evt.target.classList.toggle('card__like-button_is-active');
          evt.target.nextElementSibling.textContent = card.likes.length;
        })
        .catch((err) => console.log(err));
    } else {
      removeLike(evt.target.closest('.card').id)
        .then((card) => {
          evt.target.classList.toggle('card__like-button_is-active');
          evt.target.nextElementSibling.textContent = card.likes.length;
        })
        .catch((err) => console.log(err));
    }
  }
};
