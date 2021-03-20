import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'mobx-react'
import apple from './stores/AppleStore'
import './index.css'

ReactDOM.render(
  <Provider apple={apple}>
    <App />
  </Provider>,
  document.getElementById('root')
);
