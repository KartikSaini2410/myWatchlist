import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/userPages/Login';
import SignUp from './Components/userPages/SignUp';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
