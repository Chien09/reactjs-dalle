import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { Configuration, OpenAIApi } from 'openai';

function App() {
  const [prompt, setPrompt] = useState(""); //store user text
  const [result, setResult] = useState(""); //store AI generated image result URL

  //setting OpenAI Key 
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key
  }); 

  const openai = new OpenAIApi(configuration); 

  const generateImage = async () => {
    const res = await openai.createImage({
      prompt: prompt, //text by user 
      n: 1, //number of image(s) to generate 
      size: "512x512" //size of image(s) to generate 
    });

    //testing return data
    //console.log(res.data.data[0].url); 

    //Storing generated image URL
    setResult(res.data.data[0].url); 
  }

  return (
    <div className="App">
      <h2>Generate an Image using Open AI API</h2>
      <textarea 
        placeholder='Search dogs running in the sky' 
        onChange={(e) => setPrompt(e.target.value)}
      />
      <br/>
      <button onClick={generateImage}>Generate an Image</button>
      <hr />
      {/*Ternary Operator to check if there is image*/}
      {result.length > 0 ? (<img src={result} alt="result image"></img>) : (<p>No image!</p>)}
    </div>
  )
}

export default App; 
