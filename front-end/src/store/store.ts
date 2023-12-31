import { legacy_createStore as createStore } from 'redux';
import authReducer from './reducer';

const store = createStore(authReducer);

export default store;