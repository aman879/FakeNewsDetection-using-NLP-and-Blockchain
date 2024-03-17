import React, {useState, useRef} from 'react';
import axios from 'axios';
import './App.css';



function App() {

  const [newsData, setNewsData] = useState(' ')
  const [prediction, setPrediction] = useState('')
  const [confidenceScore, setconfidenceScore] = useState(' ')
  const textAreaRef = useRef(null);

  const onTextArea = (event) => {
    const news = event.target.value
    setNewsData(news)
    console.log(news)
  }

  const predictBtn = async () => {
    try {
      const response = await axios.post('http://localhost:3000/predict', { data: newsData})
      if (response.data[0] === 0) {
        setPrediction('False')
      }
      if (response.data[0] === 1) {
        setPrediction('True')
      }
      const normal_number = parseFloat(response.data[1])
      console.log(normal_number)
      setconfidenceScore(normal_number)
    } catch(error) {
      console.error('error', error)
    }
  }
  
  const clearText = (event) => {
    textAreaRef.current.value = '';
    setNewsData(' ')
  }
  
  return (
    <div className='container'>
      <div>
        <h1>Fake News Detection</h1>
        <div className="form-group">
          <p>Paste your News below</p>
          <textarea ref={textAreaRef} onChange={onTextArea} name="mediaNews" rows="5" cols="50" />
          <br />
          <button onClick={predictBtn} className="predict-btn" type="button">Predict</button>
          <button onClick={clearText} type='button'>Clear</button>
          {
            prediction 
            ?
            <div>
                  <p>Prediction: {prediction}</p>
                  <p>Confidence Score: {confidenceScore}</p>
                </div>
              : <p></p>
          }
          
        </div>
      </div>
    </div>
  );
}

export default App;
