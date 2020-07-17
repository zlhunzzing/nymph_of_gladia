import React, { Dispatch } from 'react';
import '../presenterStyles/StadiumPresenter.css';
import store from '..';
import { User, Position } from '../common/interface/BattleInterface';

interface Props {
  setIsTurn: Dispatch<boolean>;
  user: User;
  eneme: User;
  hand: Array<object>;
  enemeHand: Array<object>;
  userPosition: Position;
  enemePosition: Position;
}

const StadiumPresenter: React.FunctionComponent<Props> = ({
  setIsTurn,
  user,
  eneme,
  hand,
  enemeHand,
  userPosition,
  enemePosition,
}: Props) => (
  <div className="Main">
    <button
      onClick={async () => {
        await store.getState().Battle.nextTurn(hand, enemeHand);
      }}
    ></button>
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
      {store
        .getState()
        .Battle.field.reverse()
        .map((floor: any, floorId: number) => (
          <div key={floorId} className="floor">
            {floor.map((room: any, roomId: number) => (
              <div key={roomId} className="room">
                {userPosition.x === roomId && userPosition.y === floorId
                  ? user.name
                  : null}
                {enemePosition.x === roomId && enemePosition.y === floorId
                  ? eneme.name
                  : null}
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
