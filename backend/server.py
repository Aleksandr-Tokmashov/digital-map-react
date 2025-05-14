from flask import Flask, jsonify, make_response
import json
import os

app = Flask(__name__)

@app.route('/api/incidents')
def get_incidents():
    json_path = os.path.join(os.path.dirname(__file__), 'data.json')
    
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    response = make_response(jsonify(data))
    response.headers['Access-Control-Allow-Origin'] = '*' 
    response.headers['Access-Control-Allow-Methods'] = 'GET'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

if __name__ == '__main__':
    app.run(debug=True)