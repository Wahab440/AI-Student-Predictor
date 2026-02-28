import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import joblib

# Load real dataset
df = pd.read_csv("../data/students_real.csv")

# Create Pass/Fail column
df["pass"] = df["G3"].apply(lambda x: 1 if x >= 10 else 0)

# Select important features
X = df[["studytime", "failures", "absences"]]
y = df["pass"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

joblib.dump(model, "student_model.pkl")

print("Real dataset model trained successfully!")