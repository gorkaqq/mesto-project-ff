export const openedModal = function (popup) {
  popup.classList.add('popup_is-opened');
};

export const closeModal = function (popup) {
  popup.classList.remove('popup_is-opened');
  for (const form of document.forms) {
    form.reset();
  }
};
