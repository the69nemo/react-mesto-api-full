class Api {
  constructor ({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _handleResponse (res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`)
    }
  }

  getUserInfoFromApi () {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
    .then((res) => this._handleResponse(res));
  }

  getCardsFromApi () {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
    .then((res) => this._handleResponse(res));
  }

  editProfileFromApi (userInfo) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(userInfo),
    })
    .then((res) => this._handleResponse(res))
  }

  postNewCardToServer(card) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(card)
    })
    .then ((res) => this._handleResponse(res));
  }

  deleteCardFromServer (cardId) {
    return fetch(`${this._url}/cards/${cardId}`,{
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => this._handleResponse(res));
  }  

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`,{
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      headers: this._headers
    })
    .then((res) => this._handleResponse(res));
  }

  patchAvatarFromApi (newAvatarLink) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: newAvatarLink }),
    })
    .then ((res) => this._handleResponse(res));
  }
}

export const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-35',
  headers: {
    authorization: '8994131c-f4f1-45cc-a5e7-8627a23e5031',
    'Content-Type': 'application/json'
  },
});