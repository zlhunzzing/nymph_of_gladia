import { combineReducers } from 'redux';
import Battle from './Battle';
import HandleModal from './HandleModal';
import Auth from './Auth';
import Socket from './Socket';
import SoundControl from './SoundControl'

const reducers = combineReducers({
  Auth,
  Battle,
  HandleModal,
  Socket,
  SoundControl,
});

export default reducers;
