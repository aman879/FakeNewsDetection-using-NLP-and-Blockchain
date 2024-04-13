from flask import Flask, request, jsonify
from load_model import predict

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict_route():
    data = request.json
    text_data = data.get('data', '') 
    prediction, confidence_score = predict(text_data)
    # print(confidence_score.tolist())
    return jsonify(prediction.tolist(), confidence_score.tolist())

if __name__ == '__main__':
    app.run(debug=True)