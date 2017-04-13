import { createStore, compose, applyMiddleware } from 'redux';
import root from './reducers/root';
import thunk from 'redux-thunk';

let devtool = window.devToolsExtension ? window.devToolsExtension() : f => f;
export default compose(applyMiddleware(thunk), devtool)(createStore)(root);
