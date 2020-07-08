import React from 'react';
import store from '../store';

export default function BattleEntryPresenter() {
  return (
    <div className="Main">
      <div>{store.getState().userCharacter.name}</div>
      <div>{store.getState().eneme.name}</div>
    </div>
  );
}
