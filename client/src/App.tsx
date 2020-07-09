import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Modal from 'react-modal';
import store from './store';
import modalCustomStyles from './common/ModalCustomStyles';

/* pages */
import Main from './pages/Main';
import SelectCharacter from './pages/SelectCharacter';
import Battle from './pages/Battle';

Modal.setAppElement('#root');

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setIsModalContent] = useState('');

  store.subscribe(() => {
    setModalIsOpen(store.getState().modalIsOpen);
    setIsModalContent(store.getState().modalContent);
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
        <button onClick={() => setModalIsOpen(false)}>확인</button>
      </Modal>
    </div>
  );
}

export default App;
