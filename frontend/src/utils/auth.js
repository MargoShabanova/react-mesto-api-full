class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  signUp(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    }).then(this._checkResponse);
  }

  signIn(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    })
      .then(this._checkResponse)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return data;
        }
      });
  }

  getContent(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
}

export const auth = new Auth({
  baseUrl: "https://mesto-react.project.nomoredomains.icu/",
  headers: {
    "Content-Type": "application/json",
  },
});
