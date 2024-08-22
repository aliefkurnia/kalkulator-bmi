import React, { useState } from "react";
import "./App.css";

function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    if (weight > 0 && height > 0) {
      const heightInMeters = height / 100; // Convert height to meters
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(2));

      // Determine BMI category
      if (bmiValue < 18.5) setCategory("Underweight");
      else if (bmiValue >= 18.5 && bmiValue < 24.9)
        setCategory("Normal weight");
      else if (bmiValue >= 25 && bmiValue < 29.9) setCategory("Overweight");
      else setCategory("Obesity");
    } else {
      setBmi(null);
      setCategory("");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>BMI Calculator</h1>
        <div className="calculator">
          <label>
            Weight (kg):
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight in kg"
            />
          </label>
          <label>
            Height (cm):
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height in cm"
            />
          </label>
          <button onClick={calculateBMI}>Calculate BMI</button>
          {bmi && (
            <div className="result">
              <h2>Your BMI: {bmi}</h2>
              <h3>Category: {category}</h3>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
