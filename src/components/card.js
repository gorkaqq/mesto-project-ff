import { deleteCard, addLike, removeLike } from './api';
import { closeModal, openedModal } from './modal';

// Функция создания карточки
export const createCard = function (
  cardImage,
  cardTitle,
  removeCard,
  openImage,
  likeCard,
  cardId,
  userId,
  cardOwnerId
) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImageElement = cardElement.querySelector('.card__image');

  cardImageElement.setAttribute('src', cardImage);
  cardImageElement.setAttribute('alt', `Фотография ${cardTitle}`);
  cardElement.querySelector('.card__title').textContent = cardTitle;
  cardElement.id = cardId;

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

// Функция удаления карточки
export const removeCard = function (evt) {
  openedModal(document.querySelector('.popup_type_delete-card'));
  const formDeleteCard = document.forms['delete-card'];
  formDeleteCard.addEventListener('submit', function (e) {
    e.preventDefault();
    evt.target.parentElement.remove();
    deleteCard(evt.target.parentElement.id);
    closeModal(formDeleteCard.closest('.popup'));
  });
};

// Функция лайка карточки
export const likeCard = function (evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');

    if (evt.target.classList.contains('card__like-button_is-active')) {
      addLike(evt.target.closest('.card').id).then((card) => {
        evt.target.nextElementSibling.textContent = card.likes.length;
      });
    } else {
      removeLike(evt.target.closest('.card').id).then((card) => {
        evt.target.nextElementSibling.textContent = card.likes.length;
      });
    }
  }
};
