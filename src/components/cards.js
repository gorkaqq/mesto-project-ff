export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];
import { openedModal, closeModal } from './modal';
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

export const openImage = function (evt) {
  const target = evt.target;
  const cardImagePopup = document.querySelector('.popup_type_image');
  openedModal(cardImagePopup);
  const popupImage = cardImagePopup.querySelector('.popup__image');
  popupImage.src = target.src;
  popupImage.alt = target.alt;
  popupImage.nextElementSibling.textContent =
    target.nextElementSibling.nextElementSibling.textContent;
};

export { openedModal, closeModal };
