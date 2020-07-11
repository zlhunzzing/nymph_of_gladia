import React from 'react';
import store from '../index';
import '../presenterStyles/SetTurnPresenter.css';

export default function SetTurnPresenter() {
  const user = store.getState().Battle.userCharacter;
  const eneme = store.getState().Battle.userCharacter;

  return (
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

      <div
        className="basicCards"
        style={{
          marginTop: '100px',
        }}
      >
        <span className="card">상</span>
        <span className="card">하</span>
        <span className="card">좌</span>
        <span className="card">우</span>
        <span className="card">방어</span>
      </div>
      <div
        className="uniqCards"
        style={{
          marginTop: '20px',
        }}
      >
        <span className="card">공격1</span>
        <span className="card">공격2</span>
        <span className="card">공격3</span>
        <span className="card">공격4</span>
        <span className="card">마나회복</span>
      </div>
      <div
        className="deck"
        style={{
          marginTop: '20px',
        }}
      >
        <span className="card">공격1</span>
        <span className="card">공격2</span>
        <span className="card">공격3</span>
      </div>
      <button>확인</button>
    </div>
  );
}

// export default SetTurnPresenter;
