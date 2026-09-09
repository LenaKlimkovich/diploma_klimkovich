import React from 'react';
import './App.css';
import { Header } from './components/Header';

import { Footer } from './components/Footer';

export function App(): React.ReactElement {
  return (
    <div className="App">
      <Header />
      <Footer />
    </div>
  );
};

export default App;
