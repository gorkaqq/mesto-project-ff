import '../pages/index.css';

import { createCard, removeCard, likeCard } from '../components/card';

import initialCards from '../components/cards';

import { openedModal, closeModal } from '../components/modal';

const cardsContainer = document.querySelector('.places__list');

// Форма редактировать профиль
const formEditProfile = document.forms['edit-profile'];

// Инпуты формы редактирования
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector(
  '.popup__input_type_description'
);

// Форма добавить карточку
const formNewPlace = document.forms['new-place'];

// Инпуты формы добавления картинки
const cardNameInput = formNewPlace.querySelector(
  '.popup__input_type_card-name'
);
const urlInput = formNewPlace.querySelector('.popup__input_type_url');

// Кнопки
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// Модальные окна
const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');

// Кнопка закрыть окно
const closePopupButton = document.querySelectorAll('.popup__close');

// Открыть редактирование профиля
editProfileButton.addEventListener('click', function () {
  openedModal(editProfilePopup);
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
});

// Открыть добавление карточки
addCardButton.addEventListener('click', function () {
  formNewPlace.reset();
  openedModal(addCardPopup);
});

// Закрытие окна на крестик
closePopupButton.forEach(function (button) {
  button.addEventListener('click', function (evt) {
    evt.stopPropagation();
    const parentPopup = evt.target.closest('.popup');
    closeModal(parentPopup);
  });
});

const handleFormEditProfileSubmit = function (evt) {
  evt.preventDefault();

  const jobValue = jobInput.value;
  const nameValue = nameInput.value;

  document.querySelector('.profile__title').textContent = nameValue;
  document.querySelector('.profile__description').textContent = jobValue;

  closeModal(formEditProfile.closest('.popup'));
  formEditProfile.reset();
};

formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);

const handleFormNewPlaceSubmit = function (evt) {
  evt.preventDefault();

  const cardNameValue = cardNameInput.value;
  const urlInputValue = urlInput.value;

  cardsContainer.prepend(
    createCard(urlInputValue, cardNameValue, removeCard, openImage)
  );

  closeModal(formNewPlace.closest('.popup'));
};

formNewPlace.addEventListener('submit', handleFormNewPlaceSubmit);

// Открытие попапа при клике по изображению
const openImage = function (evt) {
  const target = evt.target;
  const cardImagePopup = document.querySelector('.popup_type_image');
  openedModal(cardImagePopup);
  const popupImage = cardImagePopup.querySelector('.popup__image');
  popupImage.src = target.src;
  popupImage.alt = target.alt;
  popupImage.nextElementSibling.textContent =
    target.nextElementSibling.nextElementSibling.textContent;
};

// Вывести карточки на страницу
for (const card of initialCards) {
  cardsContainer.append(
    createCard(card.link, card.name, removeCard, openImage, likeCard)
  );
}
