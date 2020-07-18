import React, { Dispatch } from 'react';
import '../presenterStyles/SetTurnPresenter.css';
// import store from '../index';
// import * as handleModalActions from '../modules/HandleModal';
import { User } from '../common/interface/BattleInterface';
import store from '..';
import * as battleActions from '../modules/Battle';

interface Props {
  user: User;
  eneme: User;
  hand: Array<object>;
  setHand: Dispatch<Array<object>>;
}

const SetTurnPresenter: React.FunctionComponent<Props> = ({
  user,
  eneme,
  hand,
  setHand,
}: Props) => (
  <div className="Main">
    {user ? (
      <div className="status">
        <div className="userStatus">
          <div>
            <div>NAME: {user.name}</div>
            <div>HP: {user.hp}</div>
            <div>MP: {user.mp}</div>
          </div>
        </div>
        <div className="enemeStatus">
          <div>NAME: {eneme.name}</div>
          <div>HP: {eneme.hp}</div>
          <div>MP: {eneme.mp}</div>
        </div>
      </div>
    ) : null}

    <div className="basicCards">
      {user.basicCards ? (
        user.basicCards.map((card: any, id: number) => (
          <span
            key={id}
            className={`card ${card.className}`}
            onClick={() => {
              let el = document.querySelector(
                `.${card.className}`,
              ) as HTMLElement;
              for (let value in hand) {
                if (
                  Object.keys(hand[value]).length === 0 &&
                  hand[value].constructor === Object &&
                  el.className !== `card ${card.className} cardOpacity`
                ) {
                  el.className = `card ${card.className} cardOpacity`;
                  hand[value] = card;
                  setHand(hand.slice(0, hand.length));
                  store.dispatch(
                    battleActions.setUserHand({
                      hand: hand.slice(0, hand.length),
                    }),
                  );
                  break;
                }
              }
            }}
          >
            {card.type}
          </span>
        ))
      ) : (
        <div>
          <span className="card"></span>
        </div>
      )}
    </div>
    <div className="uniqueCards">
      {user.uniqueCards ? (
        user.uniqueCards.map((card: any, id: number) => (
          <span
            key={id}
            className={`card ${card.className}`}
            onClick={() => {
              let el = document.querySelector(
                `.${card.className}`,
              ) as HTMLElement;
              for (let value in hand) {
                if (
                  Object.keys(hand[value]).length === 0 &&
                  hand[value].constructor === Object &&
                  el.className !== `card ${card.className} cardOpacity`
                ) {
                  el.className = `card ${card.className} cardOpacity`;
                  hand[value] = card;
                  setHand(hand.slice(0, hand.length));
                  store.dispatch(
                    battleActions.setUserHand({
                      hand: hand.slice(0, hand.length),
                    }),
                  );
                  break;
                }
              }
            }}
          >
            {card.type}
          </span>
        ))
      ) : (
        <div>
          <span className="card"></span>
        </div>
      )}
    </div>

    <div className="control">
      <span className="setHand">
        <span>
          {hand
            ? hand.map((card: any, id: number) => (
                <span
                  key={id}
                  className="card"
                  onClick={() => {
                    if (Object.keys(card).length !== 0) {
                      hand[id] = {};
                      setHand(hand.slice(0, hand.length));
                      store.dispatch(
                        battleActions.setUserHand({
                          hand: hand.slice(0, hand.length),
                        }),
                      );
                      let el = document.querySelector(
                        `.${card.className}`,
                      ) as HTMLElement;
                      el.className = `card ${card.className}`;
                    }
                  }}
                >
                  {card.type ? card.type : '비었다'}
                </span>
              ))
            : null}
        </span>
      </span>
      <button
        className="continueButton"
        onClick={() => {
          // for (let value in hand) {
          //   if (
          //     Object.keys(hand[value]).length === 0 &&
          //     hand[value].constructor === Object
          //   ) {
          //     store.dispatch(
          //       handleModalActions.setModalContent({
          //         content: '카드를 세장 선택해주세요.',
          //       }),
          //     );
          //     store.dispatch(
          //       handleModalActions.setModalIsOpen({ isOpen: true }),
          //     );
          //     return;
          //   }
          // }
          // setIsTurn(true);
          store.dispatch(battleActions.setIsTurn());
        }}
      >
        확인
      </button>
    </div>
  </div>
);

export default SetTurnPresenter;
