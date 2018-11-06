import { combineReducers } from 'redux';
import { getDataReducer } from './DataReducers';

const cryptoApp = combineReducers({
    getDataReducer,
});

export default cryptoApp;