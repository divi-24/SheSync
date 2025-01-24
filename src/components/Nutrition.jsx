import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Nutrition() {
  const navigate = useNavigate();
  const [nutritionTips, setNutritionTips] = useState([]);
  const [yogaTips, setYogaTips] = useState([]);

  useEffect(() => {
    // Fetch nutrition and yoga tips from an API or define them here
    const fetchedNutritionTips = [
      "Stay hydrated by drinking plenty of water.",
      "Eat iron-rich foods like spinach and lentils.",
      "Include omega-3 fatty acids in your diet.",
    ];
    const fetchedYogaTips = [
      "Practice gentle yoga poses like Child's Pose and Cat-Cow.",
      "Avoid intense workouts and focus on relaxation.",
      "Incorporate deep breathing exercises.",
    ];

    setNutritionTips(fetchedNutritionTips);
    setYogaTips(fetchedYogaTips);
  }, []);

  return (
    <div>
      <h1>Nutrition and Yoga During Menses</h1>
      <section>
        <h2>Nutrition Tips</h2>
        <ul>
          {nutritionTips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Yoga Tips</h2>
        <ul>
          {yogaTips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </section>
      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
}

export default Nutrition;
