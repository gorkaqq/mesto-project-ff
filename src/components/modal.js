export const openedModal = function (popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEscape);
  popup.addEventListener('click', closeByOverlay);
};

export const closeModal = function (popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscape);
  popup.removeEventListener('click', closeByOverlay);
};

// Закрытие окна на Escape
const closeByEscape = function (evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
};

// Закрытие окна на оверлэй
const closeByOverlay = function (evt) {
  if (evt.target.classList.contains('popup')) {
    closeModal(evt.target);
  }
};
