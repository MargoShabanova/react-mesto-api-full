import PopupWithForm from "./PopupWithForm";

export default function DeleteConfirmPopup({ isOpen, onClose, onDeleteCard, card }) {

  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(card);
  }

  return (
    <PopupWithForm
      name="delete-confirm"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
