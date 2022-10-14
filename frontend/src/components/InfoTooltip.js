import React from "react";

export default function InfoTooltip({
  isOpen,
  onClose,
  resImage,
  resAlt,
  resText,
}) {
  return (
    <div className={`popup popup_type_tooltip ${isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_type_tooltip">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <img className="popup__tooltip-image" src={resImage} alt={resAlt} />
        <p className="popup__tooltip-message">{resText}</p>
      </div>
    </div>
  );
}
