class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: "include",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(console.log);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: "include",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(console.log);
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then(this._checkResponse)
      .catch(console.log);
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then(this._checkResponse)
      .catch(console.log);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(console.log);
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(console.log);
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      credentials: "include",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(console.log);
  }

  changeLikeCardStatus(id, state) {
    return state ? this.addLike(id) : this.deleteLike(id);
  }

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    })
      .then(this._checkResponse)
      .catch(console.log);
  }
}

export const api = new Api({
  baseUrl: "https://mesto-react.project.nomoredomains.icu/",
  headers: {
    "Content-Type": "application/json",
  },
});
