import React from 'react';

interface Props {
  roomInfo: any;
  outRoom: Function;
}

const GreenroomrPresenter: React.FunctionComponent<Props> = ({
  roomInfo,
  outRoom,
}: Props) => (
  <div className="Main">
    <br></br>
    <br></br>
    <br></br>
    {console.log(roomInfo)}
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
            {roomInfo && roomInfo.player1 ? '안녕' : null}
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
            준비완료
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
            {roomInfo && roomInfo.player2 ? '안녕' : null}
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
            준비완료
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
      >
        게임시작
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
);

export default GreenroomrPresenter;
