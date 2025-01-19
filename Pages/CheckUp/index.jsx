import React, { useState } from "react";
import Navbar from "../../Components/Molecules/Navbar";
import img1 from "../../Assets/top-view-mint-cinnamon-with-spices-white-ingredients-leaves.jpg";
import img2 from "../../Assets/dosha.webp";
import './index.css';
import CheckupBottum from "../../Components/Molecules/CheckupBottum";

// List of questions with options
const questions = [
  {
    id: 1,
    question: "How would you describe your physical activity?",
    options: [
      "I am very active.",
      "I'm rather inert.",
      "I am moderately active.",
    ],
  },
  {
    id: 2,
    question: "How often do you feel thirsty?",
    options: ["Rarely", "Moderately", "Frequently"],
  },
  {
    id: 3,
    question: "What is your sleep pattern like?",
    options: ["Very restful", "Disturbed", "Average"],
  },
  { id: 4, question: "Your Body Frame?", options: ["Thin", "Medium", "Large"] },
  { id: 5, question: "Your Skin Type?", options: ["Dry", "Normal", "Oily"] },
  { id: 6, question: "Your Hair Type?", options: ["Dry", "Normal", "Oily"] },
  {
    id: 7,
    question: "Do You Gain or Lose Weight Easily?",
    options: ["Yes", "No"],
  },
  {
    id: 8,
    question: "How is Your Hunger?",
    options: ["Irregular", "Moderate", "Strong"],
  },
  {
    id: 9,
    question: "Your Body Temperature Generally?",
    options: ["Cold", "Hot"],
  },
  {
    id: 10,
    question: "Your Bowel Movement Type?",
    options: ["Regular", "Frequent", "Irregular"],
  },
  {
    id: 11,
    question: "How Do You Sweat?",
    options: ["Excessive", "Moderate", "Little"],
  },
  { id: 12, question: "Energetic or Tired Easily?", options: ["Yes", "No"] },
  {
    id: 13,
    question: "Your Sleep Pattern?",
    options: ["Lighter", "Deeper", "Insomnia"],
  },
  {
    id: 14,
    question: "Your Temperature Status?",
    options: ["Cold", "Hot", "Moderate"],
  },
  {
    id: 15,
    question: "How Do You Handle Stress?",
    options: ["Calm", "Irritable", "Anxious"],
  },
  {
    id: 16,
    question: "Your Memory Type?",
    options: ["Sharp", "Moderate", "Slow"],
  },
  {
    id: 17,
    question: "Your Physical Activity?",
    options: ["Active", "Moderate", "Sedentary"],
  },
  {
    id: 18,
    question: "How Do You Speak?",
    options: ["Quickly", "Moderate", "Slowly"],
  },
  { id: 19, question: "Decision Making Ability?", options: ["Quick", "Slow"] },
  {
    id: 20,
    question: "Your Social Behavior?",
    options: ["Interactive", "Solitude"],
  },
  {
    id: 21,
    question: "How About Your Mindset?",
    options: ["Creative", "Logical", "Emotionally Steady"],
  },
  {
    id: 22,
    question: "Do You Experience?",
    options: ["Bloating", "Heartburn", "Sluggish Digestion"],
  },
  {
    id: 23,
    question: "How Often Do You Feel Thirsty?",
    options: ["Frequently", "Moderately", "Rarely"],
  },
  {
    id: 24,
    question: "What Climate Do You Prefer?",
    options: ["Cold", "Moderate", "Warm"],
  },
];

const CheckUp = () => {
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [doshaResult, setDoshaResult] = useState(null);
  const [testCompleted, setTestCompleted] = useState(false); // New state to track test completion

  const handleStartTest = () => {
    setTestStarted(true);
  };

  const handleAnswerSelect = (option) => {
    setAnswers({ ...answers, [currentQuestionIndex]: option });
  };

  const handleNext = () => {
    if (answers[currentQuestionIndex]) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Calculate Dosha after all questions are answered
        const result = calculateDosha(answers);
        setDoshaResult(result);
        setTestCompleted(true); // Mark test as completed
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Function to calculate Dosha based on answers
  const calculateDosha = (answers) => {
    let vata = 0, pitta = 0, kapha = 0;

    // Example simple logic to classify doshas based on answers
    Object.values(answers).forEach((answer) => {
      if (["I am very active.", "Rarely", "Very restful", "Thin"].includes(answer)) vata++;
      if (["Moderately", "Hot", "Strong", "Regular"].includes(answer)) pitta++;
      if (["Moderate", "Cold", "Irregular", "Large"].includes(answer)) kapha++;
    });

    if (vata > pitta && vata > kapha) return { dosha: "Vata", bodyConstitution: "Vata types are generally light, energetic, and active, with a tendency to have dry skin and a slender frame.",
      presentLifestyleHabits: "You may have irregular eating habits, tend to overthink, and might feel anxious or stressed frequently. You may have difficulty maintaining a steady routine.",
      futureAnalysis: "You will benefit from grounding activities such as yoga and meditation. Focus on building a balanced lifestyle with regular meals and adequate rest to calm your nervous system and improve your overall well-being." };

    if (pitta > vata && pitta > kapha) return { dosha: "Pitta",  bodyConstitution: "Pitta types have a medium build, muscular frame, and tend to have a warm body temperature with oily skin and a sharp intellect.",
      presentLifestyleHabits: "You are likely to be passionate, driven, and focused, but you might be prone to irritability, anger, and digestive issues like acidity.",
      futureAnalysis: "To maintain balance, you should avoid overheating and focus on staying calm. Incorporate cooling foods, regular exercise, and stress-relieving practices such as deep breathing and relaxation exercises." };

    if (kapha > vata && kapha > pitta) return { dosha: "Kapha",  bodyConstitution: "Kapha types are often strong, solid, and have a tendency toward a heavier, more muscular build. They may have oily skin and thick hair.",
      presentLifestyleHabits: "You may experience sluggish digestion, a tendency to gain weight easily, and prefer routines over change. Stress might affect you less emotionally but can lead to physical issues like lethargy.",
      futureAnalysis: "To improve your vitality, engage in regular physical activities and adopt a lighter, spicier diet. Avoid excessive sleep and strive for mental stimulation to keep your energy levels high and your mind sharp." };


    return { dosha: "Balanced", bodyConstitution: "You have a balanced constitution with characteristics from all three doshas.",
      presentLifestyleHabits: "You are likely to be adaptable and stable in your routine. However, there could be moments when one dosha becomes more prominent than others, affecting your well-being.",
      futureAnalysis: "Maintain your balanced approach to life by engaging in activities that support all areas—physical, mental, and emotional health. Focus on moderation, flexibility, and resilience to prevent imbalances." };
  };

  // Function to apply a class for selected answer
  const getOptionClass = (option) => {
    if (answers[currentQuestionIndex] === option) {
      return "selected-answer";
    }
    return "";
  };

  return (
    <div>
      <Navbar />
      <img
        style={{
          width: "100%",
          height: "500px",
          objectFit: "cover",
          imageRendering: "auto",
        }}
        src={img1}
        alt="Background"
      />
      <div
        style={{
          textAlign: "left",
          width: "80%",
          margin: "0 auto",
          marginTop: "60px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <a href="/" style={{ color: "green" }}>
          Home
        </a>
        <p style={{ fontSize: "18px", marginTop: "-1px" }}>{">>"}</p>
        <a style={{ color: "green" }} href="/checkup">
          Dosha CheckUp
        </a>
      </div>
      <hr
        style={{
          height: "3px",
          width: "80%",
          margin: "0 auto",
          color: "black",
        }}
      />
      <div
        style={{
          textAlign: "left",
          marginTop: "20px",
          width: "80%",
          margin: "0 auto",
          fontSize: "22px",
        }}
      >
        <p>
          Dosha checking in Ayurveda involves assessing an individual's
          physical, mental, and emotional traits to determine their dominant
          dosha—Vata, Pitta, or Kapha—and guide personalized health and
          lifestyle recommendations.
        </p>
      </div>
      <div className="why-container">
        <div className="why-content">
          <div className="why-section" style={{ padding: "0px" }}>
            <div className="why-image" style={{ width: '40%', padding: '20px' }}>
              <img
                src={img2}
                alt="Why AyurSensei"
                style={{ borderRadius: "0px", objectFit: 'cover' }}
              />
            </div>
            <div className="why-text">
              <h1 className="why-title">Body Constitution Checker</h1>
              <hr style={{ width: "85%" }}></hr>
              {!testStarted ? (
                <>
                  <p>
                    AyurSensei provides personalized Ayurvedic consultations and
                    treatments tailored to your unique needs. Our experienced
                    practitioners use traditional methods combined with modern
                    insights to help you achieve balance and well-being.
                  </p>
                  <button onClick={handleStartTest} className="start-button" id="homecardbtn" style={{width:'100px'}}>
                    Start Test
                  </button>
                </>
              ) : (
                <>
                  <h2>{questions[currentQuestionIndex].question}</h2>
                  <div className="options-container">
                    {questions[currentQuestionIndex].options.map((option, index) => (
                      <button
                        style={{borderRadius:'10px'}}
                        key={index}
                        onClick={() => handleAnswerSelect(option)}
                        className={`option-button ${getOptionClass(option)}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    {!testCompleted && (
                      <>
                        <button id="homecardbtn" style={{marginRight:'10px',width:'100px'}} onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                          Previous
                        </button>
                        <button id="homecardbtn" style={{width:'100px'}} onClick={handleNext}>
                          {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
                        </button>
                      </>
                    )}
                  </div>
                  {testCompleted && (
                   <div style={{ marginTop: "20px" }}>
                   <h3 className="highlighted-text">Your Dosha is : {doshaResult.dosha}</h3>
                   <p>
                     <span className="highlighted-text-green">Your Body Constitution Explanation:</span> {doshaResult.bodyConstitution}
                   </p>
                   <p>
                     <span className="highlighted-text-purple">Present Lifestyle Habits You Can Follow:</span> {doshaResult.presentLifestyleHabits}
                   </p>
                   <p>
                     <span className="highlighted-text-red">Your Future Analysis:</span> {doshaResult.futureAnalysis}
                   </p>
                 </div>
                 
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <CheckupBottum />
    </div>
  );
};

export default CheckUp;
