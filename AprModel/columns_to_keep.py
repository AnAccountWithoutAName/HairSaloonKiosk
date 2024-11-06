import pandas as pd

# Load all sheets of the Excel file
file_path = r"C:\Users\LENOVO\Documents\Research papers\MiniProject\HairSaloonKiosk\AprModel\processed_data.xlsx"
all_sheets = pd.read_excel(file_path, sheet_name=None)  # Reads all sheets into a dictionary

# List to hold all processed data
processed_data = []

# List of columns to keep (example columns, replace with actual ones you need)
columns_to_keep = ["Service"]

for sheet_name, df in all_sheets.items():
    # Process each DataFrame by selecting necessary columns and dropping rows with NaN values
    if all(col in df.columns for col in columns_to_keep):
        df_filtered = df[columns_to_keep].dropna()
        # Optionally, add a column for the sheet name if needed to identify the source
        df_filtered['Sheet Name'] = sheet_name
        processed_data.append(df_filtered)  # Append the processed DataFrame to the list

# Concatenate all processed DataFrames into a single DataFrame
final_df = pd.concat(processed_data, ignore_index=True)

# Save the combined DataFrame to a single sheet in an Excel file
output_path = r"C:\Users\LENOVO\Documents\Research papers\MiniProject\HairSaloonKiosk\AprModel\processed_data_combined.xlsx"
final_df.to_excel(output_path, index=False, sheet_name="CombinedData")
