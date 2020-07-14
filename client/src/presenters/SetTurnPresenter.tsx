import React, { Dispatch } from 'react';
import '../presenterStyles/SetTurnPresenter.css';

interface User {
  name: string;
  hp: number;
  mp: number;
  basicCards: Array<object>;
  uniqueCards: Array<object>;
}

interface Props {
  setIsTurn: Dispatch<boolean>;
  user: User;
  setUser: Dispatch<User>;
  eneme: User;
  setEneme: Dispatch<User>;
  hand: Array<object>;
  setHand: Dispatch<Array<object>>;
}

const SetTurnPresenter: React.FunctionComponent<Props> = ({
  setIsTurn,
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
      <div className="hand">
        <div>
          {hand
            ? hand.map((card: any, id: number) => (
                <span
                  key={id}
                  className="card"
                  onClick={() => {
                    if (Object.keys(card).length !== 0) {
                      hand[id] = {};
                      setHand(hand.slice(0, hand.length));
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
        </div>
      </div>
      <button
        className="continueButton"
        onClick={() => {
          setIsTurn(true);
        }}
      >
        확인
      </button>
    </div>
  </div>
);

export default SetTurnPresenter;
