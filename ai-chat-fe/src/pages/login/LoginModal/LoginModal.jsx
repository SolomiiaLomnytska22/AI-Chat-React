import React, { useState } from 'react';
import './LoginModal.css';
import { completeLogin } from '../../../services/login';

const LoginModal = () => {
  const [login, setlogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
        await completeLogin(login, password);
    } catch (err){
        console.log(err)
    }
    
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="login">login:</label>
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
