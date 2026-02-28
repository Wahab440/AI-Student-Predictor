import React, { useState } from "react";
import axios from "axios";

function App() {
  const [studytime, setStudytime] = useState(1);
  const [failures, setFailures] = useState(0);
  const [absences, setAbsences] = useState(0);
  const [result, setResult] = useState("");

  const handlePredict = async () => {
    const response = await axios.post("http://localhost:3001/predict", {
      studytime,
      failures,
      absences
    });

    setResult(response.data.prediction === 1 ? "PASS 🎉" : "FAIL ❌");
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>🎓 Student AI Predictor</h1>

      <input type="number" placeholder="Study Time"
        onChange={(e) => setStudytime(Number(e.target.value))} /><br/><br/>

      <input type="number" placeholder="Failures"
        onChange={(e) => setFailures(Number(e.target.value))} /><br/><br/>

      <input type="number" placeholder="Absences"
        onChange={(e) => setAbsences(Number(e.target.value))} /><br/><br/>

      <button onClick={handlePredict}>Predict</button>

      <h2>{result}</h2>
    </div>
  );
}

export default App;