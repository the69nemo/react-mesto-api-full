import React, {useEffect} from "react";

function InfoTooltip({name, onClose, isOpen, title, imgPath}) {
  const handleCloseByEsc = (evt) => evt.key === "Escape" && onClose(evt);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleCloseByEsc);
    }
    return () => document.removeEventListener("keydown", handleCloseByEsc);
  }, [isOpen]);

  return (
    <section
      className= {
        isOpen ? `popup popup_${name} popup__opened` : `popup popup_${name}`
      }
      onClick={onClose}       
    >
      <div className="popup__content popup__content_type_infoTooltip">
        <img src={imgPath} alt={title} className="popup__img" /> 
        <h2 className="popup__title popup__title_infoToolTips">
          {title}
        </h2>
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

export default InfoTooltip;
