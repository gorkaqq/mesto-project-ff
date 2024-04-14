import '../pages/index.css';

import {
  createCard,
  initialCards,
  removeCard,
  likeCard,
  openImage,
  openedModal,
  closeModal,
} from '../components/cards';
const cardsContainer = document.querySelector('.places__list');

// Кнопки
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// Модальные окна
const popups = document.querySelectorAll('.popup');
const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');

// Кнопка закрыть окно
const closePopupButton = document.querySelectorAll('.popup__close');

// Открыть редактирование профиля
editProfileButton.addEventListener('click', function () {
  openedModal(editProfilePopup);
});

// Открыть добавление карточки
addCardButton.addEventListener('click', function () {
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

// Закрытие окна на Escape
document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    for (const popup of popups) {
      if (popup.classList.contains('popup_is-opened')) {
        closeModal(popup);
      }
    }
  }
});

// Закрытие окна на оверлэй
popups.forEach(function (popup) {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closeModal(popup);
    }
  });
});

// Форма редактировать профиль
const formEditProfile = document.forms['edit-profile'];

const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector(
  '.popup__input_type_description'
);

const handleFormEditProfileSubmit = function (evt) {
  evt.preventDefault();

  const jobValue = jobInput.value;
  const nameValue = nameInput.value;

  document.querySelector('.profile__title').textContent = nameValue;
  document.querySelector('.profile__description').textContent = jobValue;

  closeModal(formEditProfile.closest('.popup'));
};

formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);

// Форма добавить карточку
const formNewPlace = document.forms['new-place'];

const cardNameInput = formNewPlace.querySelector(
  '.popup__input_type_card-name'
);
const urlInput = formNewPlace.querySelector('.popup__input_type_url');

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

// Вывести карточки на страницу
for (const card of initialCards) {
  cardsContainer.append(
    createCard(card.link, card.name, removeCard, openImage, likeCard)
  );
}
