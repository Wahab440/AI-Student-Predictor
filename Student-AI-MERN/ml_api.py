from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

model = joblib.load("../model/student_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    input_data = pd.DataFrame({
        "studytime": [data["studytime"]],
        "failures": [data["failures"]],
        "absences": [data["absences"]]
    })

    prediction = model.predict(input_data)[0]

    return jsonify({"prediction": int(prediction)})
@app.route("/")
def home():
    return "AI API is running successfully!"

if __name__ == "__main__":
    app.run(port=5000)