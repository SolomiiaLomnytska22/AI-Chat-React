import React, { useState } from 'react';
import './LoginModal.css';
import { completeLogin } from '../../../services/login';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const LoginModal = () => {
  const [login, setlogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try{
        await completeLogin(login, password);
        navigate('/chat')
    } catch (err){
        console.log(err)
        toast.error('❌' + err.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
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
            onChange={(e) => setlogin(e.target.value)}
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
      </form>
    </div>
  );
};

export default LoginModal;
