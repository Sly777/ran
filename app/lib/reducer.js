import { combineReducers } from 'redux'
import { reducer as authReducer } from '~/stores/auth'

export default function getReducer(client) {
  return combineReducers({
    apollo: client.reducer(),
    auth: authReducer,
  })
}
