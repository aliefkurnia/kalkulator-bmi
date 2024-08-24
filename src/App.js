import React, { useState, useEffect } from "react";
import "./App.css";
import GaugeChart from "react-gauge-chart";
import Header from "./components/header";
import Footer from "./components/footer";
import {
  MemoryRouter,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import PaginationComponent from "./components/paginationComponent";
import ArticleSection from "./components/articleSection";

function AppContent() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [mode, setMode] = useState("bmi");
  const [bmi, setBmi] = useState(null);
  const [brocaWeight, setBrocaWeight] = useState(null);
  const [category, setCategory] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const articlesPerPage = 4;
  const maxArticles = 50; // Limit to 50 articles

  const calculateBMI = () => {
    if (weight > 0 && height > 0) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(2));

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

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=health&apiKey=3662f02b40f044c8b728cff56887e4b0`
      );
      const data = await response.json();
      setArticles(data.articles.slice(0, maxArticles)); // Limit to 50 articles
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const currentArticles = articles.slice(
    (page - 1) * articlesPerPage,
    page * articlesPerPage
  );

  const minBMI = 10;
  const maxBMI = 50;
  const normalizedBMI = bmi
    ? Math.min(Math.max((bmi - minBMI) / (maxBMI - minBMI), 0), 1)
    : 0;

  return (
    <>
      <Header />
      <div className="calculator">
        <h1>BMI & Broca Calculator</h1>
        <label>
          Weight (kg):
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>
        <label>
          Height (cm):
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
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
        {bmi && mode === "bmi" && (
          <div className="result">
            <h2>BMI: {bmi}</h2>
            <p>Category: {category}</p>
            <div className="gauge-container">
              <GaugeChart
                id="bmi-gauge"
                nrOfLevels={20}
                colors={["#FF0000", "#FFFF00", "#00FF00"]}
                percent={normalizedBMI}
                textColor="#000"
                needleColor="#000"
              />
            </div>
          </div>
        )}
        {brocaWeight && mode === "broca" && (
          <div className="result">
            <h2>Ideal Weight: {brocaWeight} kg</h2>
          </div>
        )}
      </div>
      <ArticleSection
        articles={currentArticles}
        loading={loading}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => {
          window.history.pushState(null, "", `?page=${newPage}`);
          fetchArticles(); // Fetch articles again to update pagination
        }}
      />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<AppContent />} />
      </Routes>
    </MemoryRouter>
  );
}
