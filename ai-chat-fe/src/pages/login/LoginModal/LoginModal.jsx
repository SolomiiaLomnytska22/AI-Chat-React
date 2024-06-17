import React, { useState, useContext } from 'react';
import './LoginModal.css';
import { completeLogin } from '../../../services/login';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { ChatContext } from '../../../context/ContextProvider';
import { getUser } from '../../../services/accessToken'; 

const LoginModal = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUserData } = useContext(ChatContext);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await completeLogin(login, password);
      const userData = getUser();
      if(userData){
        setUserData(userData);
        navigate('/chat');
      }
      else throw Error('The user is not found!')
    } catch (err) {
      console.log(err);
      toast.error('❌' + err.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light"
      });
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="login">Username:</label>
          <input
            type="text"
            id="login"
            className="input"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            className="input"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p className="register-btn" onClick={() => navigate('/register')}>Don't have account? Register</p>
      </form>
    </div>
  );
};

export default LoginModal;
