from flask import Flask, request, jsonify
from load_model import predict

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict_route():
    data = request.json
    predictions = predict(data)
    return jsonify(predictions.tolist())

if __name__ == '__main__':
    app.run(debug=True)