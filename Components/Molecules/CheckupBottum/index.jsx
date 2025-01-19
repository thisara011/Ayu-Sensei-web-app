import React from "react";
import Footer from "../Footer";

const CheckupBottum = () => {
    return (
        <div>
       
      <div className="why-content">
      <h1 style={{marginTop:'60px'}}>How Does Ayursensei Wroks?</h1>
        <div className="why-section">
            
          <div className="why-image" style={{width:'35%'}}>
            <h5>What is an Ayurveda Type?</h5>
          </div>
          <div className="why-text">
          <h1 className="why-title">What is Ayur Sensei?</h1>
          <hr style={{width:'50%'}}></hr>
            <p>
              AyurSensei provides personalized Ayurvedic consultations and treatments tailored to your unique needs. Our experienced practitioners use traditional methods combined with modern insights to help you achieve optimal health and wellness. Join us on a journey to a healthier, more balanced life.
            </p>
          </div>
        </div>
      </div>
      <div className="why-content">
        <div className="why-section">
          <div className="why-image" style={{width:'35%'}}>
            <h5>What is an Ayurveda Type?</h5>
          </div>
          <div className="why-text">
          <h1 className="why-title">Ayursensei Predicts...</h1>
          <hr style={{width:'50%'}}></hr>
            <p>
              AyurSensei provides personalized Ayurvedic consultations and treatments tailored to your unique needs. Our experienced practitioners use traditional methods combined with modern insights to help you achieve optimal health and wellness. Join us on a journey to a healthier, more balanced life.
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
       
    );
    }

export default CheckupBottum;