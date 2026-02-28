import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [studytime, setStudytime] = useState(1);
  const [failures, setFailures] = useState(0);
  const [absences, setAbsences] = useState(0);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePredict = async () => {
    setLoading(true);
    setError("");
    setResult("");
    
    try {
      const response = await axios.post("http://localhost:3001/predict", {
        studytime,
        failures,
        absences
      });

      const isPassing = response.data.prediction === 1;
      setResult({
        status: isPassing ? "PASS" : "FAIL",
        isPassing: isPassing
      });
    } catch (err) {
      setError("Unable to get prediction. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="background-gradient"></div>
      
      <div className="content-wrapper">
        <div className="header-section">
          <div className="icon-circle">🎓</div>
          <h1 className="title">Student AI Predictor</h1>
          <p className="subtitle">Predict your academic success with advanced AI</p>
        </div>

        <div className="card main-card">
          <div className="form-section">
            <p className="section-label">Enter Your Information</p>
            
            <div className="input-group">
              <label htmlFor="studytime" className="input-label">
                <span className="label-icon">📚</span> Study Time (hours/week)
              </label>
              <input
                id="studytime"
                type="number"
                min="0"
                max="10"
                value={studytime}
                onChange={(e) => setStudytime(Number(e.target.value))}
                className="input-field"
                placeholder="Enter study hours"
              />
              <div className="input-info">0-10 hours per week</div>
            </div>

            <div className="input-group">
              <label htmlFor="failures" className="input-label">
                <span className="label-icon">❌</span> Number of Failures
              </label>
              <input
                id="failures"
                type="number"
                min="0"
                max="10"
                value={failures}
                onChange={(e) => setFailures(Number(e.target.value))}
                className="input-field"
                placeholder="Enter number of failures"
              />
              <div className="input-info">Previous class failures</div>
            </div>

            <div className="input-group">
              <label htmlFor="absences" className="input-label">
                <span className="label-icon">📋</span> Absences
              </label>
              <input
                id="absences"
                type="number"
                min="0"
                max="93"
                value={absences}
                onChange={(e) => setAbsences(Number(e.target.value))}
                className="input-field"
                placeholder="Enter number of absences"
              />
              <div className="input-info">Total school absences</div>
            </div>
          </div>

          <button 
            onClick={handlePredict} 
            className="predict-button"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Get Prediction"}
          </button>

          {error && (
            <div className="error-message">
              <span>⚠️</span> {error}
            </div>
          )}

          {result && (
            <div className={`result-section ${result.isPassing ? "success" : "failure"}`}>
              <div className="result-icon">
                {result.isPassing ? "🎉" : "📚"}
              </div>
              <div className="result-text">
                <p className="result-status">
                  {result.isPassing ? "Predicted Result:" : "Predicted Result:"}
                </p>
                <p className={`result-value ${result.isPassing ? "pass" : "fail"}`}>
                  {result.status}
                </p>
                <p className="result-description">
                  {result.isPassing 
                    ? "Great job! Keep up the good work! 💪" 
                    : "Don't give up! Improve your study habits! 📖"}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="info-section">
          <p className="info-text">
            💡 <strong>Tip:</strong> The AI model analyzes your study patterns to predict academic success.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;