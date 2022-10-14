export default function PopupWithForm({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  children,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container popup__content">
        <button className="popup__close" onClick={onClose}></button>
        <form
          className={`form form_type_${name}`}
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          <h2 className="form__title">{title}</h2>
          {children}
          <button type="submit" className="form__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
