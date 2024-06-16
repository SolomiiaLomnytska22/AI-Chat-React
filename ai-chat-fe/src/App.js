import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import MainPage from "./pages/main-page/MainPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="login" element={ <LoginPage/> } />
        <Route path="chat" element={ <MainPage/> } />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
