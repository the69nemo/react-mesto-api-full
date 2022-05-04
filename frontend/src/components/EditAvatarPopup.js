import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen, onClose]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__form">
        <input
          type="url"
          required
          id="avatar-url"
          className="popup__form-input popup__form-avatar-url"
          placeholder="Ссылка на картинку"
          name="avatarUrl"
          ref={avatarRef}
        />
        <span className="popup__error" id="avatar-url-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
