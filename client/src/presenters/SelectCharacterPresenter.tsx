import React from 'react';
import '../presenterStyles/SelectCharacterPresenter.css';
import { Link } from 'react-router-dom';
import ERROR_MESSAGE from '../common/ErrorMessages';
import store from '../store';

interface Props {
  userCharacter: string;
  setUserCharacter: any;
  isSelect: boolean;
  setIsSelect: any;
}

const SelectCharacterPresenter: React.FunctionComponent<Props> = ({
  userCharacter,
  setUserCharacter,
  isSelect,
  setIsSelect,
}: Props) => (
  <div className="Main">
    <h1 className="MainTitle">Nymph of Gladia</h1>
    <h2>- 캐릭터 선택 -</h2>

    {isSelect ? (
      <div className="userCharacter">{userCharacter}</div>
    ) : (
      <div className="userCharacter">{ERROR_MESSAGE.UNSELECT}</div>
    )}
    <ul className="select">
      <li>
        <a
          href="#1"
          // className="characters"
          onClick={(e) => {
            e.preventDefault();
            setUserCharacter('세키');
            // battleActions.selectCharacter("Seki");
            store.dispatch({ type: 'SELECT_CHARACTER', name: 'Seki' });
            setIsSelect(true);
          }}
        >
          세키
        </a>
        <a
          href="#2"
          onClick={(e) => {
            e.preventDefault();
            setUserCharacter('레티');
            // battleActions.selectCharacter("Reti");
            store.dispatch({ type: 'SELECT_CHARACTER', name: 'Reti' });
            setIsSelect(true);
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
          alert('캐릭터를 선택해주세요.');
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
