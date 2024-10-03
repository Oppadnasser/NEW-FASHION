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
import { useState, useRef, useEffect } from "react";
import MainP from "./scripts/MainP";
import ProductPage from "./scripts/ProductPage";
import UserRegister from "./scripts/Register";
import LogIn from "./scripts/LogIn";
import LogOut from "./scripts/Logout";
import MyImage from "./assets/logo.png";
import NewPost from "./scripts/PostNewProduct";
import MyPosts from "./scripts/MyPosts";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faGoogle,
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
  faGem,
  faHome,
  faEnvelope,
  faPhone,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
function App() {
  const div2Ref = useRef(null);
  const [div1Animation, setDiv1Animation] = useState(false);

  useEffect(() => {
    const handleAnimationEnd = () => {
      setDiv1Animation(true);
    };

    const div2 = div2Ref.current;
    if (div2) {
      div2.addEventListener("animationend", handleAnimationEnd);
    }

    return () => {
      if (div2) {
        div2.removeEventListener("animationend", handleAnimationEnd);
      }
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="header">
          <div className="logo">
            <div className="new-home-header">
              <div
                className={`cssanimation leMagnify sequence${
                  div1Animation ? "animate" : ""
                }`}
                id={`new${div1Animation ? "animate" : ""}`}
              >
                {" "}
                New{" "}
              </div>{" "}
              <hr id="line" ref={div2Ref} />
              <div
                className={`cssanimation leMagnify sequence${
                  div1Animation ? "animate" : ""
                }`}
                id={`fashion${div1Animation ? "animate" : ""}`}
              >
                {" "}
                Fashion{" "}
              </div>
            </div>
          </div>

          <nav className="nav-bar">
            <ul>
              <li className="showed-content">
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
      <footer className="text-center text-lg-start bg-body-tertiary text-muted">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
          <div>
            <a href="#!" className="me-4 text-reset">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#!" className="me-4 text-reset">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#!" className="me-4 text-reset">
              <FontAwesomeIcon icon={faGoogle} />
            </a>
            <a href="#!" className="me-4 text-reset">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#!" className="me-4 text-reset">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="#!" className="me-4 text-reset">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <FontAwesomeIcon icon={faGem} className="me-3" />
                  NEW FASHION
                </h6>
                <p>
                  online store offering trendy and affordable clothing,
                  accessories, and footwear. It provides a wide variety of
                  styles, from casual to formal wear, with a focus on keeping up
                  with the latest fashion trends. New Fashion aims to deliver a
                  seamless shopping experience with personalized recommendations
                  and special deals for customers looking to stay stylish
                  year-round.
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p>
                  <a href="#!" className="text-reset">
                    camera
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    accessories
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    laptop
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    mobile
                  </a>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>

                <p>
                  <a href="#!" className="text-reset">
                    Orders
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Help
                  </a>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <FontAwesomeIcon icon={faHome} className="me-3" />
                  Giza , Egypt
                </p>
                <p>
                  <FontAwesomeIcon icon={faEnvelope} className="me-3" />{" "}
                  oppadnasser@gmail.com
                </p>
                <p>
                  <FontAwesomeIcon icon={faPhone} className="me-3" /> + 20 103
                  045 2252
                </p>
                <p>
                  <FontAwesomeIcon icon={faPrint} className="me-3" /> + 20 103
                  045 2252
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2021 Copyright:
          <a className="text-reset fw-bold" href="">
            newfashion.com
          </a>
        </div>
      </footer>
    </Router>
  );
}

export default App;
