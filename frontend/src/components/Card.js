import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__delete ${
    isOwn ? "element__delete_visible" : "element__delete_hidden"
  }`;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__button ${
    isLiked ? "element__button_active" : "element__button"
  }`;

  function handleImageClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="element element_checked">
      <img
        className="element__photo"
        src={card.link}
        alt={card.name}
        onClick={handleImageClick}
      />
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
      ></button>
      <div className="element__name-container">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <span className="element__like-count">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}
