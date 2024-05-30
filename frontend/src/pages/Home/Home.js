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
                <p>Welcome to New Fake Detection. Your trusted platform that uses the power of machine learning and blockchain technology to fight fake news. News article. Using cutting-edge technology, we analyze news to determine its authenticity and provide users with a trust score that tells users whether the news is true or false. We use the transparency and security of blockchain technology to implement a powerful voting system. Through smart contracts, users can vote on news articles, increasing the approval process and further verifying the authenticity of the news. Together we can create a more informed, trustworthy media environment</p>
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
