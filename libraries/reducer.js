import { combineReducers } from 'redux';
import { reducer as authReducer } from '../components/AuthFields/store';

export default function getReducer(client) {
  return combineReducers({
    apollo: client.reducer(),
    auth: authReducer
  });
}
