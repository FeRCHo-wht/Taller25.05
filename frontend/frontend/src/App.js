import React, { useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import LibrosList from './components/LibrosList';

function App() {
  const [activeTab, setActiveTab] = useState('libros');

  return (
    <div className="App">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'libros' && <LibrosList />}
      {/* Agrega componentes para autores, géneros y préstamos aquí */}
    </div>
  );
}

export default App;
