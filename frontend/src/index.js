import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {BrowserRouter as Router} from 'react-router-dom'
import {applyMiddleware, createStore} from 'redux'
import rootReducer from './module/wholereducer'
import {Provider} from 'react-redux'
import {persistStore} from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react';
import logger from 'redux-logger'
import { composeWithDevTools} from 'redux-devtools-extension'
import '@fortawesome/fontawesome-free/js/all.js';



const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)))
const persistor = persistStore(store)

ReactDOM.render(
  // <React.StrictMode>
    <Router>
      <Provider store={store}>
          <PersistGate persistor={persistor}>
              <App />
          </PersistGate>
      </Provider>
    </Router>
  /* </React.StrictMode> */

  ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
