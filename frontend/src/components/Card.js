import React, {useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);   

  const hanldeClick  = () => onCardClick(card);
  const handleLike = () => onCardLike(card);
  const handleDeleteClick = () => onCardDelete(card);
  
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((item) => item === currentUser._id);

  const cardDeleteButtonClassName = (
    `element__trash-box-button ${!isOwn && 'element__trash-box-button_hidden'}`
  );
  const cardLikeButtonClassName = (
    `element__button ${isLiked && 'element__button_active'}`
  );  
    
  return (
    <article className="element" >
      <img className="element__image" src={card.link} alt={card.name} onClick={hanldeClick} />
      <div className="element__container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button className={cardLikeButtonClassName} onClick={handleLike} type="button"></button>
          <p className="element__like-number">{card.likes.length}</p>
        </div>
      </div>
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button"></button>
    </article>
  );
}

export default Card;
