import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split

# Step 1: Load the dataset
file_path = R"C:\Users\LENOVO\Documents\Research papers\MiniProject\HairSaloonKiosk\AprModel\processed_data.xlsx" 
data = pd.read_excel(file_path)

# Step 2: Display basic information
print("First 5 rows of the dataset:")
print(data.head())
print("\nDataset Info:")
data.info()

# Step 3: Handle Missing Values
# You can choose to fill missing values, drop them, or use some imputation methods
# Example: Filling missing numeric values with the mean
numeric_cols = data.select_dtypes(include=['float64', 'int64']).columns
data[numeric_cols] = data[numeric_cols].fillna(data[numeric_cols].mean())

# Filling missing categorical values with mode
categorical_cols = data.select_dtypes(include=['object']).columns
data[categorical_cols] = data[categorical_cols].fillna(data[categorical_cols].mode().iloc[0])

# Step 4: Encode Categorical Variables
# Label Encoding for categorical columns
label_encoder = LabelEncoder()
for col in categorical_cols:
    data[col] = label_encoder.fit_transform(data[col])

# Step 5: Feature Scaling (Optional based on model)
# Standardize the numeric features
scaler = StandardScaler()
data[numeric_cols] = scaler.fit_transform(data[numeric_cols])

# Step 6: Split the data into features (X) and target (y)
# Assuming the last column is the target, modify as needed
X = data.iloc[:, :-1]
y = data.iloc[:, -1]

# Step 7: Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 8: Save the preprocessed data to CSV (if needed)
X_train.to_csv('X_train.csv', index=False)
X_test.to_csv('X_test.csv', index=False)
y_train.to_csv('y_train.csv', index=False)
y_test.to_csv('y_test.csv', index=False)

print("Preprocessing complete. Train and test datasets have been saved.")
