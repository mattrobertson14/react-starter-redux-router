import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import { Root } from './components';
import rootReducer from './redux/reducers';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk),
		(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || (a=>a)
	)
);

ReactDOM.render(
	<Root store={store} />,
	document.getElementById('root')
);
registerServiceWorker();
