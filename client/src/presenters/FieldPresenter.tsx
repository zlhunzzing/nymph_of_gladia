import React from 'react';
import '../presenterStyles/FieldPresenter.css';
import { Player } from '../common/interface/BattleInterface';
import CARD_DICTIONARY from '../common/CardDictionary';

const imageRequires = {
  PLAYER: require('../images/player.gif'),
  PLAYER_ATTACK: require('../images/playerAttack.png'),
};

interface Props {
  roomInfo: any;
  player1: Player;
  player2: Player;
  field: Array<object>;
  isUsing: Array<Array<boolean>>;
}

const FieldPresenter: React.FunctionComponent<Props> = ({
  roomInfo,
  player1,
  player2,
  field,
  isUsing,
}: Props) => (
  <div className="Main">
    {player1 ? (
      <div className="status">
        <div className="player1Status">
          <div>
            <div>NAME: {player1.name + `(${roomInfo.player1name})`}</div>
            <div>HP: {player1.hp}</div>
            <div>MP: {player1.mp}</div>
          </div>
        </div>
        <div className="player2Status">
          <div>NAME: {player2.name + `(${roomInfo.player2name})`}</div>
          <div>HP: {player2.hp}</div>
          <div>MP: {player2.mp}</div>
        </div>
      </div>
    ) : null}

    <div className="field">
      {field
        ? field.map((floor: any, floorId: number) => (
            <div key={floorId} className="floor">
              {floor.map((room: any, roomId: number) => (
                <div
                  key={roomId}
                  className={`room ${room.effect ? 'activeRoom' : ''}`}
                >
                  {player1.position.x === roomId &&
                  player1.position.y === floorId ? (
                    <img
                      alt=""
                      src={
                        player1.isAttack
                          ? imageRequires.PLAYER_ATTACK
                          : imageRequires.PLAYER
                      }
                      style={
                        player1.position.x > player2.position.x
                          ? {
                              width: '75px',
                              transform: 'scaleX(-1)',
                            }
                          : { width: '75px' }
                      }
                    />
                  ) : null}
                  {player2.position.x === roomId &&
                  player2.position.y === floorId ? (
                    <img
                      alt=""
                      src={
                        player2.isAttack
                          ? imageRequires.PLAYER_ATTACK
                          : imageRequires.PLAYER
                      }
                      style={
                        player1.position.x < player2.position.x
                          ? {
                              width: '75px',
                              transform: 'scaleX(-1)',
                            }
                          : { width: '75' }
                      }
                    />
                  ) : null}
                </div>
              ))}
            </div>
          ))
        : null}
    </div>

    <div className="control">
      <span className="playerHand">
        {player1.hand
          ? player1.hand
              .slice(0)
              .reverse()
              .map((card: any, id: number) => (
                <img
                  src={isUsing[id][0] ? card.image : CARD_DICTIONARY.NONE.image}
                  alt=""
                  key={id}
                  className="card"
                ></img>
              ))
          : null}
      </span>
      <span className="player2Hand">
        {player2.hand
          ? player2.hand.map((card: any, id: number) => (
              <img
                src={isUsing[id][1] ? card.image : CARD_DICTIONARY.NONE.image}
                alt=""
                key={id}
                className="card"
              ></img>
            ))
          : null}
      </span>
    </div>
  </div>
);

export default FieldPresenter;
