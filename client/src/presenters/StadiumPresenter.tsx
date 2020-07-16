import React, { Dispatch } from 'react';
import '../presenterStyles/StadiumPresenter.css';
import store from '..';
import { User } from '../common/interface/BattleInterface';

interface Props {
  setIsTurn: Dispatch<boolean>;
  user: User;
  eneme: User;
  hand: Array<object>;
  enemeHand: Array<object>;
}

const StadiumPresenter: React.FunctionComponent<Props> = ({
  setIsTurn,
  user,
  eneme,
  hand,
  enemeHand,
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
      <span className="playerHand">
        {hand
          ? hand.map((card: any, id: number) => (
              <span key={id} className="card">
                {card.type ? card.type : '비었다'}
              </span>
            ))
          : null}
      </span>
      <span className="enemeHand">
        {enemeHand
          ? enemeHand.map((card: any, id: number) => (
              <span key={id} className="card">
                {card.type ? card.type : '비었다'}
              </span>
            ))
          : null}
      </span>
    </div>
  </div>
);

export default StadiumPresenter;
