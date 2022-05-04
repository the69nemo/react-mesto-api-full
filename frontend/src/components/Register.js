import React, {useState} from "react";
import {Link } from "react-router-dom";

function Register({onAuth}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  

  const handleChangeEmail = (evt) => {    
    setEmail(evt.target.value);
  }

  const handleChangePassword = (evt) => {
    setPassword(evt.target.value);
  }
  
  const  handleSubmit = (evt) => {
    evt.preventDefault();
    onAuth(password, email);
  }

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h2 className="register__title">Регистрация</h2>
      <fieldset className="register__input-wrapper">
        <input 
        type="email"
        className="register__input" 
        placeholder="Email"
        value={email || ''} 
        onChange={handleChangeEmail}
        />
        <input
        type="password"
        className="register__input" 
        placeholder="Пароль"
        value={password || ''} 
        onChange={handleChangePassword}
        />
      </fieldset>
      <button type="submit" className="register__reg-button">Зарегистрироваться</button>
      <Link to='/signin' className="register__redirect-button">Уже зарегистрированы? Войти</Link>
    </form>
  );
}

export default Register;
