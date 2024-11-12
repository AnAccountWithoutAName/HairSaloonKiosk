import pandas as pd
from flask import Flask, request, jsonify
import json
from mlxtend.frequent_patterns import apriori, association_rules
import os

print(os.getcwd())
app = Flask(__name__)

# Load service data JSON
with open('Haircut_Site\src\Services_data.json', 'r') as f:
    service_data = json.load(f)

# Load and process Apriori model data
file_path = r"AprModel\binary_matrix_services.xlsx"

df = pd.read_excel(file_path)[:50]

# Drop unnecessary columns if they exist
df = df.drop(columns=['Sheet Name'], errors='ignore')

# Apply the Apriori algorithm and generate rules
frequent_itemsets = apriori(df, min_support=0.02, use_colnames=True)
rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.1)

# Extract valid service titles from the JSON
def get_service_titles(data):
    titles = []
    for category in data["male_categories"] + data["female_categories"]:
        titles.extend([service["title"] for service in category["services"]])
    return set(titles)

valid_service_titles = get_service_titles(service_data)

# Recommendation endpoint
@app.route('/api/recommendations', methods=['POST'])
def get_recommendations():
    data = request.json
    cart_items = [item['title'] for item in data['cartItems']]
    
    # Filter association rules to match cart items
    matching_rules = rules[rules['antecedents'].apply(lambda x: any(item in cart_items for item in x))]
    sorted_rules = matching_rules.sort_values(by='confidence', ascending=False)

    # Select up to 4 valid recommendations
    recommendations = set()
    for _, rule in sorted_rules.iterrows():
        for item in rule['consequents']:
            if item not in cart_items and item in valid_service_titles and len(recommendations) < 4:
                recommendations.add(item)
        if len(recommendations) >= 4:
            break
    
    # If not enough recommendations, choose random valid alternatives
    if len(recommendations) < 4:
        alternatives = [item for item in valid_service_titles if item not in cart_items]
        additional_recommendations = set(alternatives[:4 - len(recommendations)])
        recommendations.update(additional_recommendations)
    
    response = jsonify({'recommendations':list(recommendations)})
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == '__main__':
    app.run(debug=True)
