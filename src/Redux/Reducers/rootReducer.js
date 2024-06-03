
import { combineReducers } from 'redux';
import appReducer from './appSlice';
import authReducer from './authSlice';


const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer
});

export default rootReducer;
