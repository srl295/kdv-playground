import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { Button } from 'antd';

async function fetchXml() {
  return (await fetch(`/mt.xml`)).text();
}

function App() {
  const [xmlData, updateXmlData] = useState({
    updating: false,
    text: "",
  });

  function update() {
    updateXmlData((o) => ({ ...o, updating: true }));
    fetchXml().then((d) => updateXmlData((o) => ({ ...o, updating: false, text: d})));
  }

  if (xmlData.updating) {
    return <i>updating</i>;
  }

  if (!xmlData.text) {
    update();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <Button type="primary">Button</Button>

        <pre>
          {xmlData.text}
        </pre>
      </header>
    </div>
  );
}

export default App;
