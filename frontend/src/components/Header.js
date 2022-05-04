import { Route, Link } from "react-router-dom";
import imgLogo from "../images/logo.svg";

function Header({ signOut, email }) {
  return (
    <header className="header">
      <img className="header__logo" src={imgLogo} alt="логотип сервиса" />
      <Route exact path="/">
        <div className="header__link-container">
        <p className="header__email">{email}</p>
        <button type="button" onClick={signOut} className="header__btn-exit">
         Выйти
        </button>
        </div>        
      </Route>
      <Route path="/signup">
        <Link to="/signin" className="header__link">
          Авторизация
        </Link>
      </Route>
      <Route path="/signin">
        <Link to="/signup" className="header__link">
          Регистрация
        </Link>
      </Route>
    </header>
  );
}

export default Header;
