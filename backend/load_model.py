import joblib
import re
from sklearn.feature_extraction.text import CountVectorizer
import pickle
from flask import Flask, request, jsonify
import nltk
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

model = joblib.load('../model.pkl')
cv = joblib.load('../countVectorizer_model.pkl')

def preprocess_data(data):
    ps = PorterStemmer()
    all_stopwords = set(stopwords.words('english'))
    words_to_remove = [
        'not', 'no', 'never', 'none',
        'news', 'article', 'story', 'report', 'information', 'source', 'publication',
        'very', 'much', 'many', 'more', 'most', 'some', 'few',
        'and', 'but', 'or', 'for', 'with', 'by', 'from', 'in', 'on', 'at',
        'said', 'told', 'according', 'states', 'claimed', 'alleges',
        'according to', 'as reported by', 'in response to', 'based on',
        'today', 'yesterday', 'tomorrow', 'now', 'recently', 'currently'
    ]
    all_stopwords = all_stopwords - set(words_to_remove)
    review = re.sub('[^a-zA-Z]', ' ', data)
    review = review.lower()
    review = review.split()
    review = [ps.stem(word) for word in review if not word in all_stopwords]
    return ' '.join(review)

def predict(data):
    final_data = preprocess_data(data)
    text_vectorized = cv.transform([final_data]).toarray()
    probailities = model.predict_proba(text_vectorized)
    print(probailities)
    confidence_score = probailities[0][1]
    print(float(confidence_score))
    prediction = model.predict(text_vectorized)[0]
    return prediction, confidence_score