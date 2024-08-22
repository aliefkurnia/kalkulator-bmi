import React, { useState } from "react";
import "./App.css";
import GaugeChart from "react-gauge-chart";

function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [mode, setMode] = useState("bmi"); // Default mode is BMI
  const [bmi, setBmi] = useState(null);
  const [brocaWeight, setBrocaWeight] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    if (weight > 0 && height > 0) {
      const heightInMeters = height / 100; // Convert height to meters
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(2));

      // Determine BMI category
      if (bmiValue < 18.5) setCategory("Underweight");
      else if (bmiValue >= 18.5 && bmiValue < 22.9)
        setCategory("Normal weight");
      else if (bmiValue >= 23 && bmiValue < 24.9) setCategory("Overweight");
      else if (bmiValue >= 25 && bmiValue < 29.9) setCategory("Obesity 1");
      else setCategory("Obesity 2");
    } else {
      setBmi(null);
      setCategory("");
    }
  };

  const calculateBrocaIndex = () => {
    if (height > 0) {
      let idealWeight;
      const heightInCm = parseInt(height, 10);

      if (gender === "male") {
        idealWeight = heightInCm - 100 - (heightInCm - 100) * 0.1;
      } else {
        idealWeight = heightInCm - 100 + (heightInCm - 100) * 0.15;
      }

      setBrocaWeight(idealWeight.toFixed(2));
    } else {
      setBrocaWeight(null);
    }
  };

  const handleCalculate = () => {
    if (mode === "bmi") {
      calculateBMI();
    } else if (mode === "broca") {
      calculateBrocaIndex();
    }
  };

  // Normalize BMI value for gauge chart (range 0 to 1)
  const minBMI = 10; // Minimum possible BMI value
  const maxBMI = 50; // Maximum possible BMI value
  const normalizedBMI = bmi
    ? Math.min(Math.max((bmi - minBMI) / (maxBMI - minBMI), 0), 1)
    : 0;

  return (
    <div className="App">
      <header className="App-header">
        <h1>BMI and Weight Calculator</h1>
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
          <label>
            Age:
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter age"
            />
          </label>
          <label>
            Gender:
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <label>
            Mode:
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="bmi">BMI</option>
              <option value="broca">Broca Index</option>
            </select>
          </label>
          <button onClick={handleCalculate}>Calculate</button>
          {mode === "bmi" && bmi && (
            <div className="result">
              <h2>Your BMI: {bmi}</h2>
              <h3>Category: {category}</h3>
              <div className="gauge-container">
                <GaugeChart
                  id="bmi-gauge"
                  nrOfLevels={30}
                  colors={["#FF0000", "#FFCC00", "#00FF00"]}
                  arcWidth={0.3}
                  percent={normalizedBMI}
                  textColor="#000000"
                  hideText
                />
              </div>
            </div>
          )}
          {mode === "broca" && brocaWeight && (
            <div className="result">
              <h2>Ideal Weight: {brocaWeight} kg</h2>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
