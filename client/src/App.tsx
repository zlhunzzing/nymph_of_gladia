import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Modal from 'react-modal';
import store from './index';
import modalCustomStyles from './common/ModalCustomStyles';
import * as HandleModalActions from './modules/HandleModal';

/* pages */
import Main from './pages/Main';
import SelectCharacter from './pages/SelectCharacter';
import Battle from './pages/Battle';

Modal.setAppElement('#root');

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setIsModalContent] = useState('');
  const [modalIsButton, setModalIsButton] = useState(true);

  store.subscribe(() => {
    setModalIsOpen(store.getState().HandleModal.modalIsOpen);
    setIsModalContent(store.getState().HandleModal.modalContent);
    setModalIsButton(store.getState().HandleModal.modalIsButton);
  });

  return (
    <div className="App">
      <Switch>
        <Route path="/main" render={() => <Main></Main>}></Route>
        <Route
          path="/selectCharacter"
          render={() => <SelectCharacter></SelectCharacter>}
        ></Route>
        <Route path="/battle" render={() => <Battle></Battle>}></Route>
        <Route path="/" render={() => <Main></Main>}></Route>
      </Switch>
      <Modal isOpen={modalIsOpen} style={modalCustomStyles}>
        <div>{modalContent}</div>
        {modalIsButton ? (
          <button
            onClick={() =>
              store.dispatch(
                HandleModalActions.setModalIsOpen({ isOpen: false }),
              )
            }
          >
            확인
          </button>
        ) : null}
      </Modal>
    </div>
  );
}

export default App;
