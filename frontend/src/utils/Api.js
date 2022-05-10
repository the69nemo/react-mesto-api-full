class Api {
  constructor ({ url }) {
    this._url = url;    
  }

  _handleResponse (res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`)
    }
  }

  getUserInfoFromApi (token) {
    return fetch(`${this._url}/users/me`, {
      headers: {        
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      
    })
    .then((res) => this._handleResponse(res));
  }

  getCardsFromApi (token) {
    return fetch(`${this._url}/cards`, {
      headers: {        
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
    .then((res) => this._handleResponse(res));
  }

  editProfileFromApi (userInfo, token) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {        
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(userInfo),
    })
    .then((res) => this._handleResponse(res))
  }

  postNewCardToServer(card, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {        
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(card)
    })
    .then ((res) => this._handleResponse(res));
  }

  deleteCardFromServer (cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`,{
      method: 'DELETE',
      headers: {        
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
    .then((res) => this._handleResponse(res));
  }  

  changeLikeCardStatus(cardId, isLiked, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`,{
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      headers: {        
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
    .then((res) => this._handleResponse(res));
  }

  patchAvatarFromApi (newAvatarLink, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {        
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ avatar: newAvatarLink }),
    })
    .then ((res) => this._handleResponse(res));
  }
}

export const api = new Api ({ 
  url: 'https://api.front.proekt.nomoredomains.work'  
});