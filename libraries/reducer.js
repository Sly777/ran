import { combineReducers } from 'redux';
import { reducer as authReducer } from '../components/AuthFields/store';

export default function getReducer() {
  return combineReducers({
    auth: authReducer
  });
}
