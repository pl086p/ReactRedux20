import React from 'react';
import {render} from 'react-dom';

/* The Provider component provides the React store to all its child components 
 * so we don't need to pass it explicitly to all the components. */
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import ReduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {AppContainer} from 'react-hot-loader';

import App from './components/App';
import DevTools from './tools/DevTools';
import initialState from './reducers/initialState';
import allReducers from './reducers/allReducersIn1';       // containts all reducers in one file
//import {rootReducer} from './reducers/rootReducer';    // using combineRedurers(): 
//import gridReducer from './reducers/gridReducer';      // containts all reducers

const rootReducer = allReducers;

/* middleware (applied at middleware)
 * ReduxThunk: deal with asyncronous process
 * logger: for writing some debug information (prev state, action, next state) to console  */
const logger = createLogger();  

/* enhancer (middleware + devTools + ...)
 * add the Redux DevTools so we can easily debug the state.
 * DevTools.instrument(): embeded in browser. need to render <DevTools />
 * window.devToolsExtension: green icon auto appears if it's a redux application. 
 */
const embededDevTools = compose(
  applyMiddleware(ReduxThunk, logger),
  DevTools.instrument()  
);

const seperateDevTools = compose(
  // applyMiddleware(ReduxThunk, logger), // slow with logger 
  applyMiddleware(ReduxThunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);


/* This creates the store so we can listen to changes and dispatch actions. */
const myReducer      = rootReducer;
const myInitialState = initialState;
const myEnhancer     = seperateDevTools;  // or embededDevTools
const myStore = createStore(myReducer, myInitialState, myEnhancer);

render(
  <AppContainer>
    <Provider store={myStore}>
      <div>
        <App />
        {/* <DevTools /> if myEnhancer = embededDevTools */}
      </div>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

