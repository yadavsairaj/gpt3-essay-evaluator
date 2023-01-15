import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
  const onUserChangedText = (event) => {
  console.log(event.target.value);
  setUserInput(event.target.value);
};
  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>sup, Enhancing Writing Skills with AI-Enabled Grading</h1>
          </div>
          <div className="header-subtitle">
            <h2>An AI-powered essay grading system to help students improve their writing skills that uses GPT-3 to Streamline essay grading process to save time</h2>
          </div>
        </div>
        {/* textarea-box*/}
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="start/paste your Essay here"
            value={userInput}
            onChange={onUserChangedText}
          />;
          {/* Generate button*/}
          <div className="prompt-buttons">
  <a
    className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
    </div>
  </a>
</div>
  {/* adding console output in UI*/}
  {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://github.com/yadavsairaj/gpt3-writer-extension-starter"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            {/*<Image src={buildspaceLogo} alt="buildspace logo" />*/}
            <p>Like this tool?- Download the Extension</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;

