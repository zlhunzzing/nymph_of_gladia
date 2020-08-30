import { combineReducers } from 'redux';
import Battle from './Battle';
import HandleModal from './HandleModal';
import Auth from './Auth';

const reducers = combineReducers({
  Auth,
  Battle,
  HandleModal,
});

export default reducers;
