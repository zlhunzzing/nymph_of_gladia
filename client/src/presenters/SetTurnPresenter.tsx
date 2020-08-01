import React, { Dispatch } from 'react';
import '../presenterStyles/SetTurnPresenter.css';
import store from '../index';
import * as handleModalActions from '../modules/HandleModal';
import { Player, Position, Card } from '../common/interface/BattleInterface';
import * as battleActions from '../modules/Battle';
import CARD_DICTIONARY from '../common/CardDictionary';

interface Props {
  player1: Player;
  player2: Player;
  hand: Array<Card>;
  setHand: Dispatch<Array<object>>;
  setPlayer1: Dispatch<Object>;
  player1Position: Position;
  player2Position: Position;
  mana: number;
  setMana: Dispatch<number>;
}

const SetTurnPresenter: React.FunctionComponent<Props> = ({
  player1,
  player2,
  hand,
  setHand,
  setPlayer1,
  player1Position,
  player2Position,
  mana,
  setMana,
}: Props) => (
  <div className="Main">
    {player1 ? (
      <div className="status">
        <div className="player1Status">
          <div>
            <div>NAME: {player1.name}</div>
            <div>HP: {player1.hp}</div>
            <div>
              MP: {mana}/{player1.mp}
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

    <div className="basicCards">
      {player1.basicCards ? (
        player1.basicCards.map((card: any, id: number) => (
          <span
            key={id}
            className={`card ${card.position}`}
            onClick={() => {
              let el = document.querySelector(
                `.${card.position}`,
              ) as HTMLElement;
              for (let value in hand) {
                if (
                  hand[value].type === 'NONE' &&
                  el.className !== `card ${card.position} selectedCard`
                ) {
                  el.className = `card ${card.position} selectedCard`;
                  hand[value] = card;
                  store.dispatch(
                    battleActions.set_player1_hand({
                      hand: hand.slice(0, hand.length),
                    }),
                  );
                  setHand(hand.slice(0, hand.length));
                  setMana(mana - card.cost);
                  // setplayer({ ...player, mp: player.mp - card.cost });
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
      {player1.uniqueCards ? (
        player1.uniqueCards.map((card: any, id: number) => (
          <span
            key={id}
            className={`card ${card.position} ${
              mana < card.cost ? 'lackedMana' : null
            }`}
            onClick={() => {
              let el = document.querySelector(
                `.${card.position}`,
              ) as HTMLElement;
              for (let value in hand) {
                if (
                  hand[value].type === 'NONE' &&
                  el.className !== `card ${card.position} selectedCard` &&
                  el.className !== `card ${card.position} lackedMana`
                ) {
                  el.className = `card ${card.position} selectedCard`;
                  hand[value] = card;
                  store.dispatch(
                    battleActions.set_player1_hand({
                      hand: hand.slice(0, hand.length),
                    }),
                  );
                  setHand(hand.slice(0, hand.length));
                  if (card.cost) {
                    setMana(mana - card.cost);
                    // setplayer({ ...player, mp: player.mp - card.cost });
                  }
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
      <span className="setHand">
        <span>
          {hand
            ? hand.map((card: Card, id: number) => (
                <span
                  key={id}
                  className="card"
                  onClick={() => {
                    if (card.type !== 'NONE') {
                      hand[id] = CARD_DICTIONARY.NONE;
                      store.dispatch(
                        battleActions.set_player1_hand({
                          hand: hand.slice(0, hand.length),
                        }),
                      );
                      setHand(hand.slice(0, hand.length));
                      if (card.cost) {
                        store.dispatch(
                          battleActions.set_player1_mp({
                            mp: player1.mp + card.cost,
                          }),
                        );
                        setMana(mana + card.cost);
                        // setplayer({ ...player, mp: player.mp + card.cost });
                      }
                      let el = document.querySelector(
                        `.${card.position}`,
                      ) as HTMLElement;
                      el.className = `card ${card.position}`;
                    }
                  }}
                >
                  {card.type === 'NONE' ? '비었다' : card.type}
                </span>
              ))
            : null}
        </span>
      </span>

      <button
        className="continueButton"
        onClick={() => {
          for (let value in hand) {
            if (hand[value].type === 'NONE') {
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
        {store.getState().Battle.field.map((floor: any, floorId: number) => (
          <div key={floorId} className="miniFloor">
            {floor.map((room: any, roomId: number) => (
              <div key={roomId} className="miniRoom">
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
    </div>
  </div>
);

export default SetTurnPresenter;
