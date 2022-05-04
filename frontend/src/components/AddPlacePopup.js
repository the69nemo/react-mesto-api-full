import React, {useState}from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onUpdateCard}) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    const handleChangeCardName = (evt) => {
        setName(evt.target.value);
    };

    const handleChangeCardLink = (evt) => {
        setLink(evt.target.value);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onUpdateCard({name, link});
        setName('');
        setLink('');
    };

  return (
    <PopupWithForm
      title="Новое место"
      name="cards"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__form">
        <input
          type="text"
          required
          id="card-name"
          className="popup__form-input popup__form-card-name"
          placeholder="Название"
          name="nameCard"
          minLength="2"
          maxLength="30"
          value={name}
          onChange={handleChangeCardName}
        />
        <span className="popup__error" id="card-name-error"></span>
        <input
          type="url"
          required
          id="card-url"
          className="popup__form-input popup__form-card-url"
          placeholder="Ссылка на картинку"
          name="cardUrl"
          value={link}
          onChange={handleChangeCardLink}
        />
        <span className="popup__error" id="card-url-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
