import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "../index.css";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import * as auth from "../utils/auth";
import successImg from "../images/regDoneImg.svg";
import unSuccessImg from "../images/regErrImg.svg";

function App() {
  const history = useHistory();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [message, setMassage] = useState({
    text: "",
    imgPath: "",
  });
  const [email, setEmail] = useState("");

  const handleEditProfileClick = () => setIsEditProfileOpen(true);
  const handleAddPlaceClick = () => setIsAddPlaceOpen(true);
  const handlEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const hadleCardClick = (card) => setSelectedCard(card);

  const closeAllPopups = () => {
    setIsEditProfileOpen(false);
    setIsAddPlaceOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfoFromApi()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => `Ошибка получения данных пользователя : ${err}`);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getCardsFromApi()
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => `Ошибка получения карточек: ${err}`);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    checkToken();
  }, []);

  const handelCloseAllPopup = (evt) => {
    if (
      evt.type === "keydown" ||
      evt.target.classList.contains("popup__opened") ||
      evt.target.classList.contains("popup__close-button")
    ) {
      closeAllPopups();
    }
  };

  const handleUpdateUser = (user) => {
    api
      .editProfileFromApi(user)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => `Ошибка редактирования данных профиля: ${err}`);
  };

  const handleUpdateAvatar = ({ avatar }) => {
    api
      .patchAvatarFromApi(avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => `Ошибка редактирования аватара профиля: ${err}`);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((err) => `Ошибка связанная с размещением лайков: ${err}`);
  };

  const handleCardDelete = (card) => {
    api
      .deleteCardFromServer(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id != card._id));
      })
      .catch((err) => `Ошибка связанная с удалением карточки: ${err}`);
  };

  const handleAddNewCard = (card) => {
    api
      .postNewCardToServer(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => `Ошибка связанная с загрузкой новой карточки: ${err}`);
  };

  const handleRegister = (password, email) => {
    auth
      .register(password, email)
      .then(() => {
        history.push("/signin");
        setMassage({
          text: "Вы успешно зарегистрировались!",
          imgPath: successImg,
        });
      })
      .catch((err) => {
        setMassage({
          text: "Что-то пошло не так! Попробуйте ещё раз.",
          imgPath: unSuccessImg,
        });
        return err == 400
          ? console.log("Ошибка 400 - некорректно заполнено одно из полей")
          : console.log(`Ошибка ${err}`);
      })
      .finally(() => setIsInfoTooltipOpen(true));
  };

  const handleAutorize = (password, email) => {
    auth
      .authorize(password, email)
      .then((data) => {
        auth.getToken(data.token).then((res) => {
          setIsLoggedIn(true);
          history.push("/");
        });
      })
      .catch((err) => {
        setMassage({
          text: "Что-то пошло не так! Попробуйте ещё раз.",
          imgPath: unSuccessImg,
        });
        setIsInfoTooltipOpen(true);
        switch (err) {
          case 400:
            console.log("Ошибка 400 - не передано одно из полей");
            break;
          case 401:
            console.log("Ошибка 401 - пользователь с email не найден ");
            break;
          default:
            console.log(`Ошибка ${err}`);
        }
      });
  };

  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getToken(token)
        .then((res) => {
          setIsLoggedIn(true);
          history.push("/");
          setEmail(res.data.email);
        })
        .catch((err) => console.log(err));
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    history.push("/signup");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header signOut={signOut} email={email} />

        <Switch>
          <Route path="/signin">
            <Login onAuth={handleAutorize} />
          </Route>

          <Route path="/signup">
            <Register onAuth={handleRegister} />
          </Route>

          <ProtectedRoute
            exact
            path="/"
            loggedIn={isLoggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handlEditAvatarClick}
            onCardClick={hadleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </Switch>
        {isLoggedIn && <Footer />}

        <EditProfilePopup
          isOpen={isEditProfileOpen}
          onClose={handelCloseAllPopup}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlaceOpen}
          onClose={handelCloseAllPopup}
          onUpdateCard={handleAddNewCard}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={handelCloseAllPopup}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          onClose={handelCloseAllPopup}
          name="confirm"
          title="Вы уверены"
          buttonText="Да"
        />

        <ImagePopup card={selectedCard} onClose={handelCloseAllPopup} />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={handelCloseAllPopup}
          name="infoTooltip"
          title={message.text}
          imgPath={message.imgPath}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
