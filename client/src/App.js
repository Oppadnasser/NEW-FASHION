import './App.css';
import AdminRegister from './scripts/adminRegister';
import Home from './scripts/home';
import Contact from './scripts/contactUs'
import Profile from './scripts/profile';
import About from './scripts/aboutUs';
import React from 'react';
import Register from './scripts/Register';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import MainP from './scripts/MainP';
import ProductPage from './scripts/ProductPage';
import UserRegister from './scripts/Register';
import LogIn from './scripts/LogIn';
import MyImage from './assets/logo.png';

function App() {
  return (
    <Router>
      <div className='App'>
        <div className='header'>
          <div className='logo'>
            {/* <p>Fashion Show</p> */}
            <Link to="/"><img src={MyImage} alt='Logo'/></Link>
          </div>

          <nav className='nav-bar'>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/products">products</Link>
              </li>
              <li>
                <Link to="/admin-register">Admin Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </ul>
          </nav>
        </div>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route path='/contact-us' element={<Contact />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<LogIn/>}/>
          <Route path='/main' element={<MainP/>}/> 
          <Route path='/product-info' element={<ProductPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
