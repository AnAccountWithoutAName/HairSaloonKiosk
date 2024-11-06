import pandas as pd
import re

# Load your Excel file
file_path = r"C:\Users\LENOVO\Documents\Research papers\MiniProject\HairSaloonKiosk\AprModel\processed_data_combined.xlsx"  # Replace with your file path
data = pd.read_excel(file_path)

# Process the first 200 entries to get unique services
data['Services'] = data['Service'].str.split(',')

# Standardize service names
def standardize_service(service):
    # Remove extra spaces, convert to lowercase, and sort the words alphabetically
    words = sorted(re.sub(r'\s+', ' ', service.strip().lower()).split())
    return ' '.join(words)

# Create a set to store standardized unique services based on first 200 entries
unique_services = set()

for services in data['Services'][:200]:  # Only considering first 200 rows
    for service in services:
        standardized_service = standardize_service(service)
        unique_services.add(standardized_service)

# Convert the set to a sorted list for consistent column ordering
unique_services = sorted(unique_services)

# Create an empty binary matrix with these unique service columns
binary_matrix = pd.DataFrame(0, index=data.index, columns=unique_services)

# Populate the binary matrix for all transactions
for idx, services in enumerate(data['Services']):
    for service in services:
        standardized_service = standardize_service(service)
        if standardized_service in binary_matrix.columns:
            binary_matrix.loc[idx, standardized_service] = 1
# Save the binary matrix to a new Excel file
output_path = 'binary_matrix_services.xlsx'
binary_matrix.to_excel(output_path, index=False)

print(f"Binary matrix saved to {output_path}")