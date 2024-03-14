import React, {useState, useRef} from 'react';
import './App.css';



function App() {

  const [newsData, setNewsData] = useState(' ')
  const textAreaRef = useRef(null);

  const onTextArea = (event) => {
    const news = event.target.value
    setNewsData(news)
    console.log(news)
  }

  const predictBtn = () => {
    console.log("clicked")
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
        </div>
      </div>
    </div>
  );
}

export default App;
