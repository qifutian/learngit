import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'mobx-react'
import counter from './stores/CounterStore'

ReactDOM.render(
  <Provider counter={counter}><App /></Provider>,
  document.getElementById('root')
)
