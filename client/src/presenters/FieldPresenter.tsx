import React from 'react';
import '../presenterStyles/FieldPresenter.css';
import store from '..';
import { Player, Position } from '../common/interface/BattleInterface';
import * as battleActions from '../modules/Battle';

interface Props {
  player1: Player;
  player2: Player;
  hand: Array<object>;
  player2Hand: Array<object>;
  player1Position: Position;
  player2Position: Position;
  mana: number;
}

const FieldPresenter: React.FunctionComponent<Props> = ({
  player1,
  player2,
  hand,
  player2Hand,
  player1Position,
  player2Position,
  mana,
}: Props) => (
  <div className="Main">
    {player1 ? (
      <div className="status">
        <div className="player1Status">
          <div>
            <div>NAME: {player1.name}</div>
            <div>HP: {player1.hp}</div>
            <div>MP: {mana}</div>
          </div>
        </div>
        <div className="player2Status">
          <div>NAME: {player2.name}</div>
          <div>HP: {player2.hp}</div>
          <div>MP: {player2.mp}</div>
        </div>
      </div>
    ) : null}
    <button
      onClick={() => {
        store.dispatch(battleActions.set_is_turn());
      }}
    >
      임시
    </button>

    <div className="field">
      {store.getState().Battle.field.map((floor: any, floorId: number) => (
        <div key={floorId} className="floor">
          {floor.map((room: any, roomId: number) => (
            <div key={roomId} className="room">
              {player1Position.x === roomId && player1Position.y === floorId
                ? player1.name
                : null}
              {player2Position.x === roomId && player2Position.y === floorId
                ? player2.name
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
      <span className="player2Hand">
        {player2Hand
          ? player2Hand.map((card: any, id: number) => (
              <span key={id} className="card">
                {card.type ? card.type : '비었다'}
              </span>
            ))
          : null}
      </span>
    </div>
  </div>
);

export default FieldPresenter;
