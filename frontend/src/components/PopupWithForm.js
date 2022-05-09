import React, { useEffect } from "react";

function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
  buttonText,
  onSubmit,
}) {
  const handleCloseByEsc = (evt) => evt.key === "Escape" && onClose(evt);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleCloseByEsc);
    }
    return () => document.removeEventListener("keydown", handleCloseByEsc);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <section
      className={
        isOpen ? `popup popup_${name} popup__opened` : `popup popup_${name}`
      }
      onClick={onClose}
    >
      <form className="popup__content" name={name} onSubmit={onSubmit}>
        <h2 className="popup__title">{title}</h2>
        {children}
        <button className="popup__save-button" type="submit">
          {buttonText}
        </button>
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
      </form>
    </section>
  );
}

export default PopupWithForm;
