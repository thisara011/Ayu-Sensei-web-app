import React from "react";
import imglogo from "../../../Assets/Screenshot 2024-09-14 101016.png";
import "./index.css";

const Navbar = () => {
  return (
    <div >
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top" style={{borderBottom:'1px solid gray'}}>

        <div className="container-fluid ">
          <a className="navbar-brand" href="/">
            <img id="imglogo" src={imglogo} alt="Logo"></img>
          </a>
          <button
            id="btn"
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{backgroundColor:'white',borderWidth:'0px'}}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0 text-center">
              <li className="nav-item mx-3 d-flex align-items-center">
                <a className="nav-link active hover-box" aria-current="page" href="home">
                  Home
                </a>
              </li>
              <li className="nav-item mx-3 d-flex align-items-center">
                <span className="vertical-line"></span>
              </li>
              <li className="nav-item mx-3 d-flex align-items-center">
                <a className="nav-link active hover-box" href="checkup">
                  Check Up
                </a>
              </li>
              <li className="nav-item mx-3 d-flex align-items-center">
                <span className="vertical-line"></span>
              </li>
              <li className="nav-item mx-3 d-flex align-items-center">
                <a className="nav-link active hover-box" href="bmi">
                  BMI Checker
                </a>
              </li>
              <li className="nav-item mx-3 d-flex align-items-center">
                <span className="vertical-line"></span>
              </li>
              <li className="nav-item mx-3 d-flex align-items-center">
                <a className="nav-link active hover-box" href="doctors">
                  Request a Prescription
                </a>
              </li>
              <li className="nav-item mx-3 d-flex align-items-center">
                <span className="vertical-line"></span>
              </li>
              <li className="nav-item mx-3 d-flex align-items-center">
                <a className="nav-link active hover-box" href="shop">
                  Ayurveda Store
                </a>
              </li>
              <li className="nav-item mx-3 d-flex align-items-center">
                <span className="vertical-line"></span>
              </li>
              <li className="nav-item mx-3 d-flex align-items-center">
                <a className="nav-link active hover-box" href="map">
                  See Map
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
