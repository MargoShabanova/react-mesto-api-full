import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  },[currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__container">
        <input
          value={name}
          onChange={handleChangeName}
          id="name-input"
          name="name"
          type="text"
          className="form__item form__item_type_name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="name-input-error form__item-error"></span>
        <input
          value={description}
          onChange={handleChangeDescription}
          id="metier-input"
          name="description"
          type="text"
          className="form__item form__item_type_metier"
          placeholder="О себе"
          required
          minLength="2"
          max="200"
        />
        <span className="metier-input-error form__item-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}
