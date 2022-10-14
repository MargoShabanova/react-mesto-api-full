import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  const cardsElements = cards.map((item) => (
    <li key={item._id}>
      <Card
        card={item}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
      />
    </li>
  ));

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <div
            className="profile__avatar-button"
            onClick={onEditAvatar}
          >
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="фото пользователя"
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            ></button>
            <p className="profile__metier">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__list">{cardsElements}</ul>
      </section>
    </main>
  );
}
