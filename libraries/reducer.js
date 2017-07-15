import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';

export default function getReducer(client) {
  return combineReducers({
    apollo: client.reducer(),
    auth: authReducer
  });
}
