import { combineReducers } from 'redux';
// reducers
import entitiesReducer from './entities/entities_reducer';
import errorsReducer from './errors/errors_reducer';
import sessionReducer from './session/session_reducer';
// import uiReducer from './ui/ui_reducer'

export default combineReducers({
  entities: entitiesReducer,
  errors: errorsReducer,
  session: sessionReducer,
//   ui: uiReducer,
})
