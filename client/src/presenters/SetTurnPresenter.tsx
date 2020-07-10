import React from 'react';
import store from '../index';

export default function SetTurn() {
  return (
    <div className="Main">
      <div>{store.getState().Battle.userCharacter.name}</div>
      <div>VS</div>
      <div>{store.getState().Battle.eneme.name}</div>
      <button>확인</button>
    </div>
  );
}
