import * as React from 'react';
import { render } from 'react-dom';
import Modal from './components/Modal';

import './styles.css';

function App() {
  return (
    <div className="App">
      <Modal />
    </div>
  );
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
