import { React, useState, useContext } from 'react';
import './RegisterModal.css';
import { completeRegistarion } from '../../../services/login';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { ChatContext } from '../../../context/ContextProvider';
import { getUser } from '../../../services/accessToken'; 

const LoginModal = () => {
  const [login, setLogin] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password_retype, setPasswordRe] = useState('');
  const [profilePictureUrl, setProfilePic] = useState('');

  const navigate = useNavigate();
  const { setUserData } = useContext(ChatContext);
  
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if(password === password_retype){
        await completeRegistarion({login, password, name, profilePictureUrl});
        const userData = getUser();
        if(userData){
          setUserData(userData);
          navigate('/chat');
        }
        else throw Error('Unable to create account!')
      }

      else throw Error('Your password does not match the one you retyped! Password: ' + password +' Retyped: ' + password_retype)

      
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
      <h2 className="login-header">Register</h2>
      <form onSubmit={handleRegister}>
      <div className="form-group">
          <label htmlFor="name">Your Display Name:</label>
          <input
            type="text"
            id="name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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

        <div className="form-group">
          <label htmlFor="password-re">Type your password again:</label>
          <input
            type="password"
            id="password-re"

            value={password_retype}
            className="input"
            onChange={(e) => setPasswordRe(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="picture">Upload your profile picture:</label>
          <input
            type="text"
            id="picture"
            value={profilePictureUrl}
            className="input"
            onChange={(e) => setProfilePic(e.target.value)}
            required
          />
          <img src={profilePictureUrl} alt="" />
        </div>
        
        <button type="submit">Create Account</button>
        <p className="register-btn" onClick={() => navigate('/login')}>Already have an account? Login</p>
      </form>
    </div>
  );
};

export default LoginModal;
