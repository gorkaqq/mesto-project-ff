import { request } from '../utils/request';

const config = {
  cardsUrl: 'https://nomoreparties.co/v1/wff-cohort-13/cards',
  profileUrl: 'https://nomoreparties.co/v1/wff-cohort-13/users/me',

  headers: {
    authorization: 'e9c87f3c-3f09-4c1e-a5cb-66c6ea36ef02',
    'Content-Type': 'application/json',
  },
};

export const getInitialCards = function () {
  return request(config.cardsUrl, {
    headers: {
      authorization: config.headers.authorization,
    },
  });
};

export const getUserInfo = function () {
  return request(config.profileUrl, {
    headers: {
      authorization: config.headers.authorization,
    },
  });
};

export const addCard = function (cardName, cardlink) {
  return request(config.cardsUrl, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardlink,
    }),
  });
};

export const editProfile = function (name, about) {
  return request(config.profileUrl, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
};

export const deleteCard = function (cardId) {
  return fetch(`${config.cardsUrl}/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
    },
  });
};

export const addLike = function (cardId) {
  return request(`${config.cardsUrl}/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  });
};

export const removeLike = function (cardId) {
  return request(`${config.cardsUrl}/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
    },
  });
};

export const checkUrl = function (url) {
  return fetch(url, {
    method: 'HEAD',
  });
};

export const replaceAvatar = function (url) {
  return fetch(`${config.profileUrl}/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  });
};
