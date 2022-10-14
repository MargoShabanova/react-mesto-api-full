import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [placeName, setPlaceName] = useState('');
  const [placeLink, setPlaceLink] = useState('');

  function handleAddName(e) {
    setPlaceName(e.target.value);
  }

  function handleAddLink(e) {
    setPlaceLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: placeName,
      link: placeLink
    })
  }

  useEffect(() => {
    setPlaceName('');
    setPlaceLink('')
  }, [isOpen])

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__container">
        <input
          value={placeName}
          onChange={handleAddName}
          id="place-name-input"
          name="name"
          type="text"
          className="form__item form__item_place-name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
        />
        <span className="place-name-input-error form__item-error"></span>
        <input
          value={placeLink}
          onChange={handleAddLink}
          id="place-url"
          name="link"
          type="url"
          className="form__item form__item_picture-link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="place-url-error form__item-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}
