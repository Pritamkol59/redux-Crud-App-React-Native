import { combineReducers } from 'redux';
import productReducer from './Reducer/productReducer';

const rootReducer = combineReducers({
    product: productReducer,
});

export default rootReducer;