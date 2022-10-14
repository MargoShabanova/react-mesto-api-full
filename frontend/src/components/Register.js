import { useState } from "react";

export default function Register({ handleRegister }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { email, password } = userData;
    handleRegister(email, password);
  }

  return (
    <main className="auth">
      <h2 className="form__title-auth">Регистрация</h2>
      <form className="form" name="login" onSubmit={handleSubmit}>
        <fieldset className="form__container">
          <input
            value={userData.email}
            onChange={handleChange}
            id="email"
            name="email"
            type="email"
            className="form__item form__item_type_auth"
            placeholder="Email"
            required
          />
          <span className="email-input-error form__item-error"></span>
          <input
            value={userData.password}
            onChange={handleChange}
            id="password"
            name="password"
            type="password"
            className="form__item form__item_type_auth"
            placeholder="Пароль"
            required
          />
          <span className="password-input-error form__item-error"></span>
        </fieldset>
        <button type="submit" className="form__submit_type_auth">
          Зарегистрироваться
        </button>
        <div className="form__link-container">
          <a className="form__link" href="/sign-in">
            Уже зарегистрированы? Войти
          </a>
        </div>
      </form>
    </main>
  );
}
