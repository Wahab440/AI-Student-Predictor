import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Create simple dataset
data = {
    "study_hours": [1,2,3,4,5,6,7,8,2,5,7,9],
    "attendance": [50,60,65,70,80,85,90,95,55,75,88,98],
    "pass":        [0,0,0,1,1,1,1,1,0,1,1,1]
}

df = pd.DataFrame(data)

# Features and label
X = df[["study_hours", "attendance"]]
y = df["pass"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = LogisticRegression()
model.fit(X_train, y_train)

# Predict
predictions = model.predict(X_test)

# Accuracy
print("Accuracy:", accuracy_score(y_test, predictions))

# Test custom input
study_hours = float(input("Enter study hours: "))
attendance = float(input("Enter attendance: "))

import pandas as pd

new_data = pd.DataFrame({
    "study_hours": [study_hours],
    "attendance": [attendance]
})

result = model.predict(new_data)

if result[0] == 1:
    print("Prediction: PASS 🎉")
else:
    print("Prediction: FAIL ❌")