import React, { Dispatch } from 'react';
import '../presenterStyles/GreenroomPresenter.css';

interface Props {
  roomInfo: any;
  outRoom: Function;
  userId: number;
  select: Function;
  character: string;
  ready: Function;
  gamestart: Function;
  setContent: Dispatch<string>;
  sendMessage: Function;
}

const GreenroomrPresenter: React.FunctionComponent<Props> = ({
  roomInfo,
  outRoom,
  userId,
  select,
  character,
  ready,
  gamestart,
  setContent,
  sendMessage,
}: Props) => (
  <div className="Main">
    <br></br>
    <br></br>
    <br></br>
    {roomInfo ? (
      <div>
        <div className="inners">
          <div className="roomTitle">
            <span style={{ paddingLeft: '10px', float: 'left' }}>
              {roomInfo.id}번방
            </span>
            {roomInfo.roomname}
            <span style={{ paddingRight: '10px', float: 'right' }}>
              ({roomInfo.headcount}/{roomInfo.maxHeadcount})
            </span>
          </div>
          <div className="innerMid">
            <span className="seat">
              <span className="seatUser">
                {roomInfo.player1 ? roomInfo.player1name : null}
              </span>
              <span
                className="seatUser"
                style={{
                  bottom: '0%',
                }}
              >
                {roomInfo.host === roomInfo.player1
                  ? '방장'
                  : roomInfo.player1
                  ? roomInfo.player1Ready
                    ? '준비완료'
                    : '준비안됨'
                  : ''}
              </span>
            </span>

            <span className="seat">
              <span className="seatUser">
                {roomInfo.player2 ? roomInfo.player2name : null}
              </span>
              <span
                className="seatUser"
                style={{
                  bottom: '0%',
                }}
              >
                {roomInfo.host === roomInfo.player2
                  ? '방장'
                  : roomInfo.player2
                  ? roomInfo.player2Ready
                    ? '준비완료'
                    : '준비안됨'
                  : ''}
              </span>
            </span>

            <ul>
              캐릭터 선택
              <li>
                <a
                  href="#1"
                  onClick={(e) => {
                    e.preventDefault();
                    select('세키');
                  }}
                >
                  세키
                </a>
                <a
                  href="#2"
                  onClick={(e) => {
                    e.preventDefault();
                    select('레티');
                  }}
                >
                  레티
                </a>
              </li>
            </ul>
            <div className="chrStat"></div>
          </div>
          <div>
            <form
              style={{
                margin: '15px',
              }}
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
            >
              <span className="chatBox"></span>
              <input
                type="text"
                className="chatInput"
                onChange={({ target: { value } }) => setContent(value)}
              ></input>
              <input
                type="reset"
                className="inputReset"
                style={{ display: 'none' }}
              ></input>
            </form>
            <span>
              <button
                style={{
                  border: '1px solid black',
                  width: '150px',
                  height: '79px',
                }}
                onClick={() => {
                  if (character) {
                    if (roomInfo.host === userId) {
                      gamestart();
                    } else {
                      ready();
                    }
                  } else {
                    alert('캐릭터를 선택해주세요.');
                  }
                }}
              >
                {roomInfo.host === userId
                  ? '게임시작'
                  : roomInfo.player2Ready
                  ? '준비완료'
                  : '준비하기'}
              </button>
              <button
                onClick={() => {
                  outRoom();
                }}
                style={{
                  margin: '10px',
                  border: '1px solid black',
                  width: '150px',
                  height: '79px',
                }}
              >
                나가기
              </button>
            </span>
          </div>
        </div>
      </div>
    ) : null}
  </div>
);

export default GreenroomrPresenter;
