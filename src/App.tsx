import React from 'react';
import './App.css';
import {DisplayField} from "./pages/DisplayField";
import {GameProvider} from "./context/GameContext";

function App() {
  return (
    <div className="App">
      <GameProvider>
        <DisplayField></DisplayField>
      </GameProvider>
    </div>
  );
}

export default App;