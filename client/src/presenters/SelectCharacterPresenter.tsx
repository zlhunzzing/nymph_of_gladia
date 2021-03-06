import React, { Dispatch } from 'react';
import '../presenterStyles/SelectCharacterPresenter.css';
import { Link } from 'react-router-dom';
import ERROR_MESSAGES from '../common/ErrorMessages';
import store from '../index';
// import * as battleActions from '../modules/Battle';
import * as handleModalActions from '../modules/HandleModal';

interface Props {
  player: string;
  setPlayer: Dispatch<string>;
  isSelect: boolean;
  setIsSelect: Dispatch<boolean>;
}

const SelectCharacterPresenter: React.FunctionComponent<Props> = ({
  player,
  setPlayer,
  isSelect,
  setIsSelect,
}: Props) => (
  <div className="Main">
    <h1 className="MainTitle">Nymph of Gladia</h1>
    <h2>- 캐릭터 선택 -</h2>

    {isSelect ? <div>{player}</div> : <div>{ERROR_MESSAGES.UNSELECT}</div>}
    <ul className="select">
      <li>
        <a
          href="#1"
          onClick={(e) => {
            e.preventDefault();
            setIsSelect(true);
            setPlayer('세키');
            // store.dispatch(battleActions.select_player({ name: '세키' }));
          }}
        >
          세키
        </a>
        <a
          href="#2"
          onClick={(e) => {
            e.preventDefault();
            setIsSelect(true);
            setPlayer('레티');
            // store.dispatch(battleActions.select_player({ name: '레티' }));
          }}
        >
          레티
        </a>
      </li>
    </ul>
    <br></br>
    <Link
      to="/battle"
      style={{
        textDecoration: 'none',
      }}
      onClick={(e) => {
        if (!isSelect) {
          e.preventDefault();
          store.dispatch(
            handleModalActions.setModalContent({
              content: ERROR_MESSAGES.UNSELECT,
            }),
          );
          store.dispatch(handleModalActions.setModalIsOpen({ isOpen: true }));
        }
      }}
    >
      결정
    </Link>
    <br></br>
    <Link
      to="/main"
      style={{
        textDecoration: 'none',
      }}
    >
      뒤로가기
    </Link>
  </div>
);

export default SelectCharacterPresenter;
