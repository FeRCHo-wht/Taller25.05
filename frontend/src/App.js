import React, { useState } from 'react';
import './App.css';
import { Header } from './components/Header';

function App() {
  const [activeTab, setActiveTab] = useState('libros');

  return (
    <div className="App">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
