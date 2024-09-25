import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { LDMLKeyboardXMLSourceFileReader, CompilerCallbacks, CompilerEvent, CompilerFileSystemCallbacks } from '@keymanapp/common-types';
import { Button } from 'antd';

async function fetchXml() {
  return (await fetch(`/mt.xml`)).text();
}

function App() {
  const [xmlData, updateXmlData] = useState({
    updating: false,
    text: "",
  });

  const almostfs = {
      readdirSync: function (name: string): string[] {
        throw new Error('Function not implemented.');
      },
      readFileSync(): Uint8Array {
        return (null as unknown) as Uint8Array;

      },
      // readFileSync: function (path: string, options?: { encoding?: null | undefined; flag?: string | undefined; } | null | undefined): Uint8Array {
      //   throw new Error('Function not implemented.');
      // },
      writeFileSync: function (path: string, data: Uint8Array): void {
        throw new Error('Function not implemented.');
      },
      existsSync: function (name: string): boolean {
        throw new Error('Function not implemented.');
      },
  };
  const fs = (almostfs as unknown) as CompilerFileSystemCallbacks;

  const callbacks : CompilerCallbacks = {
    loadFile: function (filename: string): Uint8Array {
      throw new Error('Function not implemented.');
    },
    fileSize: function (filename: string): number {
      throw new Error('Function not implemented.');
    },
    path: {
      dirname: function (name: string): string {
        throw new Error('Function not implemented.');
      },
      extname: function (name: string): string {
        throw new Error('Function not implemented.');
      },
      basename: function (name: string, ext?: string | undefined): string {
        throw new Error('Function not implemented.');
      },
      isAbsolute: function (name: string): boolean {
        throw new Error('Function not implemented.');
      },
      join: function (...paths: string[]): string {
        throw new Error('Function not implemented.');
      },
      normalize: function (p: string): string {
        throw new Error('Function not implemented.');
      }
    },
    fs,
    resolveFilename: function (baseFilename: string, filename: string): string {
      throw new Error('Function not implemented.');
    },
    reportMessage: function (event: CompilerEvent): void {
      throw new Error('Function not implemented.');
    },
    debug: function (msg: string): void {
      throw new Error('Function not implemented.');
    },
  };

  function update() {
    updateXmlData((o) => ({ ...o, updating: true }));
    fetchXml().then((d) => {
      updateXmlData((o) => ({ ...o, updating: false, text: d}));
      new LDMLKeyboardXMLSourceFileReader({
        importsPath: '/dev/null'
      }, callbacks).load((d as unknown) as Uint8Array);
    });
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
