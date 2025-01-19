import React, { useState, useEffect } from "react";
import img1 from "../../Assets/bmi.webp";
import Navbar from "../../Components/Molecules/Navbar";
import "./index.css"; // Importing the CSS for the speedometer effect
import ProgressBar from 'react-bootstrap/ProgressBar';

const BMI = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [angle, setAngle] = useState(0); // State to store the current angle
  const [progress, setProgress] = useState(0);
  const [barVariant, setBarVariant] = useState("success"); // Default color variant

  const calculateBMI = () => {
    if (height && weight) {
      const bmiValue = weight / ((height / 100) ** 2); // BMI formula
      setBmi(bmiValue);
    }
  };

  // Function to determine the angle and color variant based on the BMI value
  const calculateAngle = (bmi) => {
    let percentage = 0;

    // Mapping BMI to percentage (based on the categories from the image)
    if (bmi < 16) {
        percentage = bmi / 40; // Severe underweight: 0% to 10%
        setBarVariant("danger"); // Severe underweight - red
      } else if (bmi < 17) {
        percentage = bmi / 40; // Deficit body weight: 10% to 20%
        setBarVariant("warning"); // Deficit body weight - yellow
      } else if (bmi <= 24.9) {
        percentage = bmi / 40; // Normal: 20% to 50%
        setBarVariant("success"); // Normal weight - green
      } else if (bmi <= 29.9) {
        percentage = bmi / 40; // Overweight: 50% to 70%
        setBarVariant("info"); // Overweight - blue
      } else if (bmi <= 34.9) {
        percentage = bmi / 40; // Obesity 1 degree: 70% to 85%
        setBarVariant("warning"); // Obesity 1 degree - yellow
      } else {
        percentage = Math.min(bmi / 40); // Obesity 2 degree: 85% to 100%
        setBarVariant("danger"); // Obesity 2 degree - red
      }
      

    setProgress(percentage * 100); // Update progress with percentage
  };

  // UseEffect to animate the needle from 0 to the calculated angle
  useEffect(() => {
    if (bmi !== null) {
      const finalAngle = calculateAngle(bmi);
      let currentAngle = 0;

      const interval = setInterval(() => {
        if (currentAngle < finalAngle) {
          currentAngle += 1; // Increment the angle to create the animation effect
          setAngle(currentAngle);
        } else {
          clearInterval(interval); // Stop once we reach the target angle
        }
      }, 5); // Adjust the speed of the animation by changing the interval time
    }
  }, [bmi]); // Trigger when the BMI value is updated

  return (
    <div>
        
      <Navbar />
      <div style={{ position: "relative", textAlign: "center",marginTop:'100px' ,height:'70px',backgroundColor:'green'}}>
      <h1 style={{color:'white',textAlign:'center',padding:'12px'}}>Calculate BMI</h1>
        </div>
      <div className="why-container" style={{ backgroundColor: "white",marginTop:'-20px' }}>
        <div className="why-content" style={{ backgroundColor: "white" }}>
          <div className="why-section">
            <div className="why-image">
              <img src={img1} alt="Try AyurSensei" style={{ width: "80%" }} />
            </div>
            <div className="why-text">
              <h1 className="why-title">How About Your BMI</h1>
              <div className="mb-3">
                <label htmlFor="height" className="form-label">
                  Enter Your Height
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="height"
                  placeholder="(cm)"
                  value={height}
                    required
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="weight" className="form-label">
                  Enter Your Weight
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="weight"
                  placeholder="(kg)"
                  value={weight}
                  required
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                style={{ backgroundColor: "green" }}
                onClick={calculateBMI}
              >
                Calculate
              </button>
            </div>
          </div>

          {/* Displaying BMI value and speedometer */}
          {bmi && (
            <div>
              <h2>Your BMI: {bmi.toFixed(2)}</h2>
              <ProgressBar 
                animated 
                now={progress} 
                variant={barVariant} // Dynamically changing the color
                style={{ height: "30px" }} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BMI;
