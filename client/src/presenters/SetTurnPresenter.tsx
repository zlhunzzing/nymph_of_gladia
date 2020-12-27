import React, { Dispatch } from 'react';
import '../presenterStyles/SetTurnPresenter.css';
import store from '../index';
import * as handleModalActions from '../modules/HandleModal';
import { Player, Card } from '../common/interface/BattleInterface';
import * as battleActions from '../modules/Battle';
import CARD_DICTIONARY from '../common/CardDictionary';
import { imageRequires } from '../common/CardDictionary'

interface Props {
  roomInfo: any;
  userId: number;
  player1: Player;
  setPlayer1: Dispatch<object>;
  player2: Player;
  usedMana: number;
  setUsedMana: Dispatch<number>;
  handMana: number;
  setHandMana: Dispatch<number>;
  setHand: Function;
  userhand: any;
  isTurn: boolean;
  setIsTurn: Dispatch<boolean>;
  setTurn: Function;
  setContent: Dispatch<string>;
  sendMessage: Function;
}

const SetTurnPresenter: React.FunctionComponent<Props> = ({
  roomInfo,
  userId,
  player1,
  setPlayer1,
  player2,
  usedMana,
  setUsedMana,
  handMana,
  setHandMana,
  setHand,
  userhand,
  isTurn,
  setIsTurn,
  setTurn,
  setContent,
  sendMessage,
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
                MP: {roomInfo.player1 === userId ? `${usedMana}/` : null}
                {player1.mp}
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
              MP: {roomInfo.player2 === userId ? `${usedMana}/` : null}
              {player2.mp}
            </span>
          </div>
        </div>
      </div>
    ) : null}

    <div className="deck">
      {roomInfo.player1 === userId
        ? player1.deck.map((card: Card, id: number) => (
            <span key={id}>
              <img
                // src={card.image}
                src={usedMana < card.cost
                  ? (imageRequires as any)[card.darkImage]
                  : (imageRequires as any)[card.image]}
                alt=""
                className={`card ${card.position} ${
                  store.getState().Battle.checkHand(card)
                    ? 'selectedCard'
                    : null
                }`}
                onClick={() => {
                  let el = document.querySelector(
                    `.${card.position}`,
                  ) as HTMLElement;
                  for (let e in userhand) {
                    if (
                      userhand[e].type === 'NONE' &&
                      el.className !== `card ${card.position} selectedCard` &&
                      usedMana >= card.cost
                    ) {
                      userhand[e] = card;
                      store.dispatch(
                        battleActions.set_user_hand({
                          hand: userhand.slice(0, 3),
                        }),
                      );
                      setPlayer1({ ...player1 });
                      setUsedMana(usedMana - card.cost);
                      setHandMana(handMana + card.cost);
                      break;
                    }
                  }
                }}
              ></img>
              {id === 4 ? <br></br> : null}
            </span>
          ))
        : player2.deck.map((card: Card, id: number) => (
            <span key={id}>
              <img
                // src={card.image}
                src={usedMana < card.cost
                  ? (imageRequires as any)[card.darkImage]
                  : (imageRequires as any)[card.image]}
                alt=""
                className={`card ${card.position} ${
                  store.getState().Battle.checkHand(card)
                    ? 'selectedCard'
                    : null
                }`}
                onClick={() => {
                  let el = document.querySelector(
                    `.${card.position}`,
                  ) as HTMLElement;
                  for (let e in userhand) {
                    if (
                      userhand[e].type === 'NONE' &&
                      el.className !== `card ${card.position} selectedCard` &&
                      usedMana >= card.cost
                    ) {
                      userhand[e] = card;
                      store.dispatch(
                        battleActions.set_user_hand({
                          hand: userhand.slice(0, 3),
                        }),
                      );
                      setPlayer1({ ...player1 });
                      setUsedMana(usedMana - card.cost);
                      setHandMana(handMana + card.cost);
                      break;
                    }
                  }
                }}
              ></img>
              {id === 4 ? <br></br> : null}
            </span>
          ))}
    </div>

    <span className="setHand">
      <span>
        {userhand
          ? userhand.map((card: Card, id: number) => (
              <img
                src={(imageRequires as any)[card.image]}
                alt=""
                key={id}
                className="card"
                onClick={() => {
                  if (card.type !== 'NONE' && !isTurn) {
                    userhand[id] = CARD_DICTIONARY.NONE;
                    store.dispatch(
                      battleActions.set_user_hand({
                        hand: userhand.slice(0, 3),
                      }),
                    );
                    setPlayer1({ ...player1 });
                    setUsedMana(usedMana + card.cost);
                    setHandMana(handMana - card.cost);
                    let el = document.querySelector(
                      `.${card.position}`,
                    ) as HTMLElement;
                    el.className = `card ${card.position}`;
                  }
                }}
              ></img>
            ))
          : null}
      </span>
    </span>

    <div className="control">
      <form
        className="battleForm"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <span className="battleChatBox"></span>
        <input
          type="text"
          className="battleChatInput"
          onChange={({ target: { value } }) => setContent(value)}
        ></input>
        <input
          type="reset"
          className="inputReset"
          style={{ display: 'none' }}
        ></input>
      </form>

      {isTurn ? (
        '상대가 준비중입니다'
      ) : (
        <button
          className="continueButton"
          onClick={() => {
            for (let e in userhand) {
              if (userhand[e].type === 'NONE') {
                store.dispatch(
                  handleModalActions.setModalContent({
                    content: '카드를 세장 선택해주세요.',
                  }),
                );
                store.dispatch(
                  handleModalActions.setModalIsOpen({ isOpen: true }),
                );
                return;
              }
            }
            setIsTurn(true);
            setTurn();
          }}
        >
          준비완료
        </button>
      )}

      <div className="miniField">
        {player1.position && player2.position
          ? store.getState().Battle.field.map((floor: any, floorId: number) => (
              <div key={floorId} className="miniFloor">
                {floor.map((room: any, roomId: number) => (
                  <div key={roomId} className="miniRoom">
                    {player1.position.x === roomId &&
                    player1.position.y === floorId
                      ? player1.name
                      : null}
                    {player2.position.x === roomId &&
                    player2.position.y === floorId
                      ? player2.name
                      : null}
                  </div>
                ))}
              </div>
            ))
          : null}
      </div>
    </div>
  </div>
);

export default SetTurnPresenter;
