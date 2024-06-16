import React from 'react';
import { Routes, Route, } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/registration/RegisterPage";
import MainPage from "./pages/main-page/MainPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChatProvider } from './context/ContextProvider'
import LandingPage from './pages/landing/LandingPage';

function App() {

  return (
    <div className="App">
      <ChatProvider>
        <Routes>
          <Route path="login" element={ <LoginPage/> } />
          <Route path="register" element={ <RegisterPage/> } />
          <Route path="chat" element={ <MainPage/> } />
          <Route path="" element={ <LandingPage/> } />
        </Routes>
        <ToastContainer />
      </ChatProvider>
    </div>
  );
}

export default App;
