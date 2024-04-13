import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [news, setNews] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [prbFakeNews, setprbFakeNews] = useState(' ');
  const [prbTrueNews, setPrbTrueNews] = useState(' ');

  const predictNews = async () => {
    try {
        const response = await axios.post('http://localhost:3000/predict', {data: news})
        console.log(response)
        if(response.data[0] === 0) {
            setPrediction('False')
        } 
        if(response.data[0] === 1) {
            setPrediction("True")
        }
        setprbFakeNews(response.data[1][0][0])
        setPrbTrueNews(response.data[1][0][1])
    } catch(e) {
        console.error('error', e)
    }
  }

  const clearText = () => {
    setNews('');
    setPrediction(null);
  };

  return (
    <>
        <div className='flex flex-col items-center h-screen'>
            <div className="w-3/4 pt-2.5 tracking-wider text-gray-200">
                <p>Social media network is one of the important parts of human life based on the recent technologies and developments in terms of computer science area. This environment has become a famous platform for sharing information and news on any topics and daily reports, which is the main era for collecting data and data transmission. There are various advantages of this environment, but in another point of view there are lots of fake news and information that mislead the reader and user for the information needed. Lack of trust-able information and real news of social media information is one of the huge problems of this system. To overcome this problem, we have proposed an integrated system for various aspects of blockchain and natural language processing (NLP) to apply machine learning techniques to detect fake news and better predict fake user accounts and posts. The Reinforcement Learning technique is applied for this process. To improve this platform in terms of security, the decentralized blockchain framework applied, which provides the outline of digital contents authority proof. More specifically, the concept of this system is developing a secure platform to predict and identify fake news in social media networks.</p>
                <p className="text-red-400 font-semibold text-4xl m-3.5">Try out our <span className="text-blue-500 italic">Model</span></p>
            </div>
            <textarea
                className="w-1/2 h-40 text-black border rounded p-2 mb-4"
                placeholder="Enter the news here..."
                value={news}
                onChange={(e) => setNews(e.target.value)}
            ></textarea>
            <div>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={predictNews}
                >
                Predict
                </button>
                <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={clearText}
                >
                Clear
            </button>
            </div>
            {prediction && (
                <div className="mt-4 p-4 border rounded">
                <p className="text-lg font-semibold">
                    Prediction: <span className="text-red-500">{prediction}</span>
                </p>
                <p className="text-lg font-semibold">
                    Probability News is Fake: <span className="text-red-500">{prbFakeNews}</span>
                </p>
                <p className="text-lg font-semibold">
                    Probability News is Real: <span className="text-red-500">{prbTrueNews}</span>
                </p>
                </div>
            )}
        </div>
    </>
  );
}
