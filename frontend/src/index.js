import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter as Router} from 'react-router-dom'
import {createStore} from 'redux'
import rootReducer from './module/wholereducer'
import {Provider} from 'react-redux'
import {persistStore} from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react';
// import logger from 'redux-logger'
// import { composeWithDevTools} from 'redux-devtools-extensions'
import StateProvider from './context';


const store = createStore(rootReducer)
const persistor = persistStore(store)
console.log(store.getState())
console.log(store)
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
          <PersistGate persistor={persistor}>
            {/* <StateProvider> */}
        <App />

        {/* </StateProvider> */}
        </PersistGate>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
