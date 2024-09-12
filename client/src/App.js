import "./App.css";
import AdminRegister from "./scripts/adminRegister";
import Home from "./scripts/home";
import Contact from "./scripts/contactUs";
import Profile from "./scripts/profile";
import About from "./scripts/aboutUs";
import React from "react";
import Register from "./scripts/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import MainP from "./scripts/MainP";
import ProductPage from "./scripts/ProductPage";
import UserRegister from "./scripts/Register";
import LogIn from "./scripts/LogIn";
import LogOut from "./scripts/Logout";
import MyImage from "./assets/logo.png";
import NewPost from "./scripts/PostNewProduct";
import MyPosts from "./scripts/MyPosts";
function App() {
  return (
    <Router>
      <div className="App">
        <div className="header">
          <div className="logo">
            {/* <p>Fashion Show</p> */}
            <Link to="/">
              <img src={MyImage} alt="Logo" />
            </Link>
          </div>

          <nav className="nav-bar">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/main">products</Link>
              </li>
              <li className="admin-register-text">
                <Link to="/admin-register">Admin Register</Link>
              </li>
              <li className="showed-content">
                <Link to="/login">Login</Link>
              </li>
              <li className="hidden-content">
                <Link to="/profile">Profile</Link>
              </li>
              <li className="hidden-content">
                <Link to="/logout">Log Out</Link>
              </li>
              <li className="seller-content">
                <Link to="/postnewProduct">POST</Link>
              </li>
            </ul>
          </nav>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/main" element={<MainP />} />
          <Route path="/product-info" element={<ProductPage />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/postnewProduct" element={<NewPost />} />
          <Route path="/myPosts" element={<MyPosts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
