const config = {
  cardsUrl: 'https://nomoreparties.co/v1/wff-cohort-13/cards',
  profileUrl: 'https://nomoreparties.co/v1/wff-cohort-13/users/me',

  headers: {
    authorization: 'e9c87f3c-3f09-4c1e-a5cb-66c6ea36ef02',
    'Content-Type': 'application/json',
  },
};

export const getInitialCards = function () {
  return fetch(config.cardsUrl, {
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const getUserInfo = function () {
  return fetch(config.profileUrl, {
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const addCard = function (cardName, cardlink) {
  return fetch(config.cardsUrl, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardlink,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const editProfile = function (name, about) {
  return fetch(config.profileUrl, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.log(err));
};

export const deleteCard = function (cardId) {
  fetch(`${config.cardsUrl}/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
    },
  }).catch((err) => console.log(err));
};

export const addLike = function (cardId) {
  return fetch(`${config.cardsUrl}/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.log(err));
};

export const removeLike = function (cardId) {
  return fetch(`${config.cardsUrl}/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.log(err));
};

export const checkUrl = function (url) {
  return fetch(url, {
    method: 'HEAD',
  })
    .then((res) => {
      if (res.ok && res.headers.get('content-type').includes('image')) {
        return true;
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.log(err));
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
