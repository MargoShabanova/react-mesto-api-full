export default function ImagePopup({card, isOpen, onClose}) {
  return (
    <div className={`popup popup_type_open-card ${isOpen && 'popup_opened'}`}>
      <div className="popup__card-container popup__content">
        <button className="popup__close popup__close_image" type="button" onClick={onClose}></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <h2 className="popup__image-title">{card.name}</h2>
      </div>
    </div>
  )
}