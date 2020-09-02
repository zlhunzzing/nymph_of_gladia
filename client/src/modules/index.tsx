import { combineReducers } from 'redux';
import Battle from './Battle';
import HandleModal from './HandleModal';
import Auth from './Auth';
import Socket from './Socket';

const reducers = combineReducers({
  Auth,
  Battle,
  HandleModal,
  Socket,
});

export default reducers;
