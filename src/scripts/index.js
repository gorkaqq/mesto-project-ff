import '../pages/index.css';

import { createCard, removeCard, likeCard } from '../components/card';

// import initialCards from '../components/cards';

import { openedModal, closeModal } from '../components/modal';
import { enableValidation, clearValidation } from '../components/validation';
import {
  getInitialCards,
  getUserInfo,
  editProfile,
  addCard,
  checkUrl,
  replaceAvatar,
} from '../components/api';

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
// Форма обновить аватар
const formNewAvatar = document.forms['new-avatar'];

// Инпуты формы добавления картинки
const cardNameInput = formNewPlace.querySelector(
  '.popup__input_type_card-name'
);
const urlInputNewPlace = formNewPlace.querySelector('.popup__input_type_url');
const urlInputNewAvatar = formNewAvatar.querySelector('.popup__input_type_url');

// Кнопки
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const editAvatar = document.querySelector('.profile__image');

// Модальные окна
const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const editAvatarPopup = document.querySelector('.popup_type_new-avatar');

// Кнопка закрыть окно
const closePopupButton = document.querySelectorAll('.popup__close');

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
};

// Открыть редактирование профиля
editProfileButton.addEventListener('click', function () {
  openedModal(editProfilePopup);
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  clearValidation(formEditProfile, validationConfig);
});

// Открыть редкатирование аватара
editAvatar.addEventListener('click', function () {
  formNewAvatar.reset();
  openedModal(editAvatarPopup);
  clearValidation(formNewAvatar, validationConfig);
});

// Открыть добавление карточки
addCardButton.addEventListener('click', function () {
  formNewPlace.reset();
  openedModal(addCardPopup);
  clearValidation(formNewPlace, validationConfig);
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
  formEditProfile.querySelector('.popup__button').textContent = 'Сохранение...';
  const jobValue = jobInput.value;
  const nameValue = nameInput.value;

  editProfile(nameValue, jobValue)
    .then((user) => {
      document.querySelector('.profile__title').textContent = user.name;
      document.querySelector('.profile__description').textContent = user.about;
    })
    .finally(() => {
      formEditProfile.querySelector('.popup__button').textContent = 'Сохранить';
    });

  closeModal(formEditProfile.closest('.popup'));
  formEditProfile.reset();
};

formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);

const handleFormNewPlaceSubmit = function (evt) {
  evt.preventDefault();
  formNewPlace.querySelector('.popup__button').textContent = 'Сохранение...';

  const cardNameValue = cardNameInput.value;
  const urlInputValue = urlInputNewPlace.value;

  addCard(cardNameValue, urlInputValue)
    .then((card) => {
      cardsContainer.prepend(
        createCard(
          urlInputValue,
          cardNameValue,
          removeCard,
          openImage,
          likeCard,
          card._id
        )
      );
    })
    .finally(() => {
      formNewPlace.querySelector('.popup__button').textContent = 'Сохранить';
    });

  closeModal(formNewPlace.closest('.popup'));
};

formNewPlace.addEventListener('submit', handleFormNewPlaceSubmit);

const handleFormNewAvatarSubmit = function (evt) {
  evt.preventDefault();
  formNewAvatar.querySelector('.popup__button').textContent = 'Сохранение...';

  const urlInputValue = urlInputNewAvatar.value;

  if (checkUrl(urlInputValue)) {
    replaceAvatar(urlInputValue).finally(() => {
      formNewAvatar.querySelector('.popup__button').textContent =
        'Сохранить...';
    });
    document.querySelector(
      '.profile__image'
    ).style.backgroundImage = `url(${urlInputValue})`;
  }
  closeModal(formNewAvatar.closest('.popup'));
};

formNewAvatar.addEventListener('submit', handleFormNewAvatarSubmit);

// Открытие попапа при клике по изображению
const openImage = function (evt) {
  const target = evt.target;
  const cardImagePopup = document.querySelector('.popup_type_image');
  openedModal(cardImagePopup);
  const popupImage = cardImagePopup.querySelector('.popup__image');
  popupImage.src = target.src;
  popupImage.alt = target.alt;

  popupImage.nextElementSibling.textContent =
    target.parentElement.querySelector('.card__title').textContent;
};

// Вывести карточки на страницу, получить данные пользователя
Promise.all([getInitialCards(), getUserInfo()])
  .then(([cards, user]) => {
    cards.forEach((card) => {
      cardsContainer.append(
        createCard(
          card.link,
          card.name,
          removeCard,
          openImage,
          likeCard,
          card._id,
          user._id,
          card.owner._id
        )
      );
    });

    document.querySelector(
      '.profile__image'
    ).style.backgroundImage = `url(${user.avatar})`;
    document.querySelector('.profile__title').textContent = user.name;
    document.querySelector('.profile__description').textContent = user.about;
  })
  .catch((err) => console.log(err));

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});
