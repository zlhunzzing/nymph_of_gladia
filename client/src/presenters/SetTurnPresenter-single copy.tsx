import React, { Dispatch } from 'react';
import '../presenterStyles/SetTurnPresenter.css';
import store from '../index';
import * as handleModalActions from '../modules/HandleModal';
import { Player, Card } from '../common/interface/BattleInterface';
import * as battleActions from '../modules/Battle';
import CARD_DICTIONARY from '../common/CardDictionary';

interface Props {
  player1: Player;
  setPlayer1: Dispatch<object>;
  player2: Player;
  usedMana: number;
  setUsedMana: Dispatch<number>;
  handMana: number;
  setHandMana: Dispatch<number>;
}

const SetTurnPresenter: React.FunctionComponent<Props> = ({
  player1,
  setPlayer1,
  player2,
  usedMana,
  setUsedMana,
  handMana,
  setHandMana,
}: Props) => (
  <div className="Main">
    {player1 ? (
      <div className="status">
        <div className="player1Status">
          <div>
            <div>NAME: {player1.name}</div>
            <div>HP: {player1.hp}</div>
            <div>
              MP: {usedMana}/{player1.mp}
            </div>
          </div>
        </div>
        <div className="player2Status">
          <div>NAME: {player2.name}</div>
          <div>HP: {player2.hp}</div>
          <div>MP: {player2.mp}</div>
        </div>
      </div>
    ) : null}

    <div className="deck">
      {player1.deck
        ? player1.deck.map((card: Card, id: number) => (
            <span key={id}>
              <img
                // src={card.image}
                src={usedMana < card.cost ? card.darkImage : card.image}
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
                  for (let e in player1.hand) {
                    if (
                      player1.hand[e].type === 'NONE' &&
                      el.className !== `card ${card.position} selectedCard` &&
                      usedMana >= card.cost
                    ) {
                      player1.hand[e] = card;
                      store.dispatch(
                        battleActions.set_player1_hand({
                          hand: player1.hand.slice(0, 3),
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
        : null}
    </div>

    <div className="control">
      <span className="setHand">
        <span>
          {player1.hand
            ? player1.hand.map((card: Card, id: number) => (
                <img
                  src={card.image}
                  alt=""
                  key={id}
                  className="card"
                  onClick={() => {
                    if (card.type !== 'NONE') {
                      player1.hand[id] = CARD_DICTIONARY.NONE;
                      store.dispatch(
                        battleActions.set_player1_hand({
                          hand: player1.hand.slice(0, 3),
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

      <button
        className="continueButton"
        onClick={() => {
          for (let e in player1.hand) {
            if (player1.hand[e].type === 'NONE') {
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
          store.dispatch(battleActions.set_is_turn());
        }}
      >
        확인
      </button>

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
