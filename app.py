import streamlit as st
import pandas as pd
import joblib
import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

# Page config
st.set_page_config(page_title="Student AI Predictor", layout="centered")

st.title("🎓 Student Performance AI Predictor")
st.markdown("A Machine Learning Web App built using Streamlit")

# Load dataset
df = pd.read_csv("data/students.csv")

# Load model
model = joblib.load("model/student_model.pkl")

# Show dataset
if st.checkbox("Show Dataset"):
    st.dataframe(df)

# User input
st.subheader("📥 Enter Student Details")

study_hours = st.slider("Study Hours", 0, 12, 4)
attendance = st.slider("Attendance (%)", 0, 100, 70)

if st.button("Predict Result"):
    new_data = pd.DataFrame({
        "study_hours": [study_hours],
        "attendance": [attendance]
    })

    result = model.predict(new_data)
    probability = model.predict_proba(new_data)

    if result[0] == 1:
        st.success(f"Prediction: PASS 🎉 (Confidence: {probability[0][1]*100:.2f}%)")
    else:
        st.error(f"Prediction: FAIL ❌ (Confidence: {probability[0][0]*100:.2f}%)")

# Visualization
st.subheader("📊 Data Visualization")

fig, ax = plt.subplots()
ax.scatter(df["study_hours"], df["attendance"], c=df["pass"])
ax.set_xlabel("Study Hours")
ax.set_ylabel("Attendance")
st.pyplot(fig)

# Model accuracy section
st.subheader("📈 Model Performance")

X = df[["study_hours", "attendance"]]
y = df["pass"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

accuracy = accuracy_score(y_test, model.predict(X_test))
st.info(f"Model Accuracy: {accuracy*100:.2f}%")