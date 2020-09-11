import React from 'react';
import '../presenterStyles/GreenroomPresenter.css';

interface Props {
  roomInfo: any;
  outRoom: Function;
  userId: number;
  select: Function;
  character: string;
  ready: Function;
  gamestart: Function;
}

const GreenroomrPresenter: React.FunctionComponent<Props> = ({
  roomInfo,
  outRoom,
  userId,
  select,
  character,
  ready,
  gamestart,
}: Props) => (
  <div className="Main">
    <br></br>
    <br></br>
    <br></br>
    {roomInfo ? (
      <div>
        <div className="inners">
          <div className="innerTop">
            <span className="seat">
              <span className="seatUser">
                {roomInfo.player1 ? '있음' : null}
              </span>
              <span
                className="seatUser"
                style={{
                  bottom: '0%',
                }}
              >
                {roomInfo.host === userId ? '방장' : ''}
              </span>
            </span>

            <span className="seat">
              <span className="seatUser">
                {roomInfo.player2 ? '있음' : null}
              </span>
              <span
                className="seatUser"
                style={{
                  bottom: '0%',
                }}
              >
                {roomInfo.player2
                  ? roomInfo.host !== 'player2' && roomInfo.player2Ready
                    ? '준비완료'
                    : '준비안됨'
                  : ''}
              </span>
            </span>
            <ul>
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
          </div>
          <span
            style={{
              margin: '10px',
              border: '1px solid black',
              width: '400px',
              height: '200px',
              float: 'left',
            }}
          ></span>
          <button
            style={{
              margin: '10px',
              border: '1px solid black',
              width: '150px',
              height: '89px',
              float: 'right',
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
              height: '89px',
              float: 'right',
            }}
          >
            나가기
          </button>
        </div>
      </div>
    ) : null}
  </div>
);

export default GreenroomrPresenter;
