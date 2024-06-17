import React from 'react';

import LoginModal from './RegisterModal/RegisterModal';
import './RegisterPage.css';

const LoginPage = () => {

  return (
    <div>
        <div className="header" style={{margin:'32px 64px'}}>
        <div className='title' style={{margin:'0'}}>
            <h1>ALPHA AI</h1>
        </div>
        <h2 className='message-h2'>Begin your jorney with our AI chat!</h2>
        </div>
      <LoginModal />
      <div className="warning">Alpha AI may display inaccurate info, including about people, so double-check its responses. </div>
    </div>
  );
};

export default LoginPage;
