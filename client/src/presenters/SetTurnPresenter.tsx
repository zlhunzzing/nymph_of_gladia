import React from 'react';
import '../presenterStyles/SetTurnPresenter.css';

interface User {
  name: string;
  hp: number;
  mp: number;
  basicCards: Array<object>;
  uniqueCards: Array<object>;
}

interface Props {
  user: User;
  setUser: any;
  eneme: User;
  setEneme: any;
  hand: any;
  setHand: any;
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
            className="card"
            onClick={() => {
              for (let value in hand) {
                if (
                  Object.keys(hand[value]).length === 0 &&
                  hand[value].constructor === Object
                ) {
                  hand[value] = card;
                  setHand(hand.slice(0, hand.length));
                  console.log(hand);
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
          <span className="card">기본카드</span>
        </div>
      )}
    </div>
    <div className="uniqueCards">
      {user.uniqueCards ? (
        user.uniqueCards.map((x: any, id: number) => (
          <span key={id} className="card">
            {x.type}
          </span>
        ))
      ) : (
        <div>
          <span className="card">고유카드</span>
        </div>
      )}
    </div>
    <div className="hand">
      <div>
        {hand
          ? hand.map((x: any, id: number) => (
              <span
                key={id}
                className="card"
                onClick={() => {
                  console.log(hand, x, x.type);
                }}
              >
                {x.type ? x.type : '비었다'}
              </span>
            ))
          : null}
      </div>
    </div>
    <button>확인</button>
  </div>
);

export default SetTurnPresenter;
