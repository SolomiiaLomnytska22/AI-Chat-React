import React from 'react';
import './LandingPage.css';
import chatImage from './../../assets/cb-hero-top.png';
import { getAccessToken } from '../../services/accessToken';
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    if (getAccessToken()){
        navigate('/chat');
    } else {
        navigate('/login');
    }
  }

  return (
    <div className="landing-page">
      <div className="image-container">
        <img src={chatImage} alt="AI Chat" />
      </div>
      <div className="content">
        <h1>Welcome to ALPHA AI</h1>
        <p>
          This AI chat is a cutting-edge platform that leverages advanced artificial intelligence to provide seamless and engaging conversations. Our chat system is designed to understand and respond to users in a natural and intuitive way.
        </p>
        <button onClick={navigateToLogin} className="login-button">
          Get Started ✨
        </button>
        <p style={{color: '#ffffff42'}}>
          Created by: Solomiia Lomnytska
        </p>
        
      </div>
    </div>
  );
};

export default LandingPage;

