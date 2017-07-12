import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './reducers/authReducer';

export default function getReducer(client) {
  return combineReducers({
    apollo: client.reducer(),
    form: formReducer,
    auth: authReducer
  });
}
