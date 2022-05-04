import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  cards,
  onCardLike,
  onCardDelete,
  onCardClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const elements = cards.map((card) => {
    return (
      <Card
        card={card}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
        key={card._id}
      />
    );
  });

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="аватар профилия"
          />
          <div className="profile__avatar-overlay" onClick={onEditAvatar}></div>
        </div>

        <div className="profile__text-container">
          <div className="profile__name-container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__button-edit profile__btn"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__button-add"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">{elements}</section>
    </main>
  );
}

export default Main;
