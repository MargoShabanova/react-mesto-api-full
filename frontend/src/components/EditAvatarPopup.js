import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen])

  return (
    <PopupWithForm
      name="avatar-edit"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__container">
        <input
          ref={avatarRef}
          id="avatar-input"
          name="avatar-url"
          type="url"
          className="form__item form__item_avatar-link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="avatar-input-error form__item-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}
