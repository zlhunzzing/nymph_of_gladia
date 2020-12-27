import React from 'react';
import '../presenterStyles/FieldPresenter.css';
import { Player } from '../common/interface/BattleInterface';
import CARD_DICTIONARY from '../common/CardDictionary';
import { imageRequires } from '../common/CardDictionary'

interface Props {
  roomInfo: any;
  player1: Player;
  player2: Player;
  field: Array<object>;
  isUsing: Array<Array<boolean>>;
  usingCard: any;
}

const FieldPresenter: React.FunctionComponent<Props> = ({
  roomInfo,
  player1,
  player2,
  field,
  isUsing,
  usingCard,
}: Props) => (
  <div className="Main">
    {player1 ? (
      <div className="status">
        <div className="player1Status">
          <div>
            <div>NAME: {player1.name + `(${roomInfo.player1name})`}</div>
            <div className="progress-bar">
              <span
                className="progress-hp"
                style={{
                  width: `${player1.hp}%`
                }}
              >
              </span>
              <span className="progress-text">
                HP: {player1.hp}
              </span>
            </div>
            <div className="progress-bar">
              <span
                className="progress-mp"
                style={{
                  width: `${player1.mp}%`
                }}
              ></span>
              <span className="progress-text">
                MP: {player1.mp}
              </span>
            </div>
          </div>
        </div>
        <div className="player2Status">
          <div>NAME: {player2.name + `(${roomInfo.player2name})`}</div>
          <div className="progress-bar">
              <span
                className="progress-hp"
                style={{
                  width: `${player2.hp}%`
                }}
              ></span>
              <span className="progress-text">
                HP: {player2.hp}
              </span>
            </div>
            <div className="progress-bar">
              <span
                className="progress-mp"
                style={{
                  width: `${player2.mp}%`
                }}
              ></span>
              <span className="progress-text">
              MP: {player2.mp}
            </span>
            </div>
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
                        player1.isAction
                          ? (imageRequires as any)[usingCard.actionImage]
                          : player1.name === '세키'
                          ? imageRequires.SEKI
                          : imageRequires.RETI
                      }
                      className={`${
                        player1.isAction ? 'usingAction' : 'basicAction'
                      } ${
                        player1.position.x > player2.position.x
                          ? 'turnAction'
                          : null
                      }`}
                    />
                  ) : null}
                  {player2.position.x === roomId &&
                  player2.position.y === floorId ? (
                    <img
                      alt=""
                      src={
                        player2.isAction
                          ? (imageRequires as any)[usingCard.actionImage]
                          : player2.name === '세키'
                          ? imageRequires.SEKI
                          : imageRequires.RETI
                      }
                      style={
                        player2.isAction
                          ? {
                              position: 'absolute',
                              transform: 'translate(-50%, -50%)',
                            }
                          : player1.position.x > player2.position.x
                          ? {
                              width: '75px',
                              transform: 'scaleX(-1)',
                            }
                          : { width: '75px' }
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
                  src={isUsing[id][0]
                    ? (imageRequires as any)[card.image]
                    :  (imageRequires as any)[CARD_DICTIONARY.NONE.image]}
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
              src={isUsing[id][1]
                ? (imageRequires as any)[card.image]
                :  (imageRequires as any)[CARD_DICTIONARY.NONE.image]}
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
