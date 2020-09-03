import React from 'react';

interface Props {
  roomInfo: any;
  outRoom: Function;
  userId: number;
  ready: Function;
}

const GreenroomrPresenter: React.FunctionComponent<Props> = ({
  roomInfo,
  outRoom,
  userId,
  ready,
}: Props) => (
  <div className="Main">
    <br></br>
    <br></br>
    <br></br>
    {roomInfo ? (
      <div>
        <div
          style={{
            border: '1px solid black',
            margin: '0 auto',
            width: '600px',
            height: '450px',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '50%',
            }}
          >
            <span
              style={{
                position: 'relative',
                border: '1px solid black',
                float: 'left',
                margin: '10px',
                width: '150px',
                height: '200px',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  display: 'inline-block',
                  transform: 'translate(-50%)',
                  textAlign: 'center',
                }}
              >
                {roomInfo.player1 ? '있음' : null}
              </span>
              <span
                style={{
                  position: 'absolute',
                  display: 'inline-block',
                  transform: 'translate(-50%)',
                  textAlign: 'center',
                  bottom: '0%',
                }}
              >
                {roomInfo.host === userId ? '방장' : ''}
              </span>
            </span>

            <span
              style={{
                position: 'relative',
                border: '1px solid black',
                float: 'left',
                margin: '10px',
                width: '150px',
                height: '200px',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  display: 'inline-block',
                  transform: 'translate(-50%)',
                  textAlign: 'center',
                }}
              >
                {roomInfo.player2 ? '있음' : null}
              </span>
              <span
                style={{
                  position: 'absolute',
                  display: 'inline-block',
                  transform: 'translate(-50%)',
                  textAlign: 'center',
                  bottom: '0%',
                }}
              >
                {roomInfo.player2
                  ? roomInfo.host !== 'player2' && roomInfo.player2Ready
                    ? '준비완료'
                    : '준비중'
                  : ''}
              </span>
            </span>
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
              if (roomInfo.host === userId) {
                console.log('게임시작');
              } else {
                ready();
              }
            }}
          >
            {roomInfo.host === userId ? '게임시작' : ''}
            {roomInfo.player2Ready ? '준비완료' : '준비중'}
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
