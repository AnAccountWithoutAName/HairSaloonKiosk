import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules

# Load the processed data
file_path = r"C:\Users\LENOVO\Documents\Research papers\MiniProject\HairSaloonKiosk\AprModel\binary_matrix_services.xlsx"
df = pd.read_excel(file_path)[:50]

# Drop unnecessary columns if they exist
df = df.drop(columns=['Sheet Name'], errors='ignore')

# Apply the Apriori algorithm
frequent_itemsets = apriori(df, min_support=0.02, use_colnames=True)

# Print frequent itemsets to ensure correctness
print("Frequent Itemsets:\n", frequent_itemsets)

# Generate the association rules
rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.1)

# Display results
print("\nAssociation Rules:\n", rules)

# Save the results to Excel
output_path = r"C:\Users\LENOVO\Documents\Research papers\MiniProject\HairSaloonKiosk\AprModel\apriori_results.xlsx"
with pd.ExcelWriter(output_path) as writer:
    frequent_itemsets.to_excel(writer, sheet_name="Frequent_Itemsets", index=False)
    rules.to_excel(writer, sheet_name="Association_Rules", index=False)
