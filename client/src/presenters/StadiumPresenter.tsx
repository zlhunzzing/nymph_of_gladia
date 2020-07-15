import React, { Dispatch } from 'react';
import '../presenterStyles/StadiumPresenter.css';
import store from '..';

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
  eneme: User;
  hand: Array<object>;
}

const StadiumPresenter: React.FunctionComponent<Props> = ({
  setIsTurn,
  user,
  eneme,
  hand,
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
    <button
      onClick={() => {
        setIsTurn(false);
      }}
    >
      임시
    </button>

    <div className="field">
      {store.getState().Battle.field.map((rooms: any, id: number) => (
        <div key={id} className="floor">
          {rooms.map((room: any, id: number) => (
            <div key={id} className="room">
              {room.player[0] === 1 ? user.name : null}
              {room.player[0] === 2 ? eneme.name : null}
              {room.player[1] === 1 ? user.name : null}
              {room.player[1] === 2 ? eneme.name : null}
            </div>
          ))}
        </div>
      ))}
    </div>

    <div className="control">
      <div>
        {hand
          ? hand.map((card: any, id: number) => (
              <span
                key={id}
                className="card"
                // onClick={() => {
                //   if (Object.keys(card).length !== 0) {
                //     hand[id] = {};
                //     // setHand(hand.slice(0, hand.length));
                //     let el = document.querySelector(
                //       `.${card.className}`,
                //     ) as HTMLElement;
                //     el.className = `card ${card.className}`;
                //   }
                // }}
              >
                {card.type ? card.type : '비었다'}
              </span>
            ))
          : null}
      </div>
    </div>
  </div>
);

export default StadiumPresenter;
