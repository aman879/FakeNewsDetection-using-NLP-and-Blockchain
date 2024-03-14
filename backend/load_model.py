import joblib
import re
import string
from sklearn.feature_extraction.text import CountVectorizer,TfidfTransformer

model = joblib.load('../test_model.pkl')
cv = joblib.load('../countVectorizer_model.pkl')
transformer = joblib.load("../TfidfTransformer_model.pkl")

def preprocess_data(data):
    data = data.get('data', '')
    data = data.lower()
    data = re.sub(r'\[.*?\]', '', data)
    data = re.sub("\\W"," ",data) # remove special chars
    data = re.sub(r'https?://\S+|www\.\S+', '', data)
    data = re.sub('<.*?>+', '', data)
    data = re.sub('[%s]' % re.escape(string.punctuation), '', data)
    data = re.sub('\n', '', data)
    data = re.sub(r'\w*\d\w*', '', data)

    if isinstance(data, str):
        data = [data]

    counts = cv.fit_transform(data)
    X = transformer.fit_transform(counts)
    return X

def predict(data):
    final_data = preprocess_data(data)
    prediction = model.predict(final_data)
    return prediction