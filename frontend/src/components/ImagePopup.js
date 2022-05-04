import React, {useEffect}from "react";

function ImagePopup({ card, onClose }) {
  const handleCloseByEsc = (evt) => evt.key === "Escape" && onClose(evt);

  useEffect(() => {
    if (card) {
      document.addEventListener("keydown", handleCloseByEsc);
    }
    return () => document.removeEventListener("keydown", handleCloseByEsc);
  }, [card]);

  return (
    <section
      className={card ? "popup popup_image popup__opened" : "popup popup_image"}
      onClick={onClose}
    >
      <figure className="popup__image-content" onClick={onClose}>
        <img
          className="popup__picture"
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
        />
        <figcaption className="popup__figcaption">
          {card ? card.name : ""}
        </figcaption>
        <button
          className="popup__close-button"
          onClick={onClose}
          type="button"
        ></button>
      </figure>
    </section>
  );
}

export default ImagePopup;
