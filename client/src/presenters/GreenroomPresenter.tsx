import React from 'react';

interface Props {
  dummyRoom: Array<object>;
}

const GreenroomrPresenter: React.FunctionComponent<Props> = ({
  dummyRoom,
}: Props) => (
  <div className="Main">
    <br></br>
    <br></br>
    <br></br>
    <div
      className="greenrooms"
      style={{
        display: 'inline-block',
        width: '600px',
        height: '450px',
        border: '1px solid black',
      }}
    >
      {dummyRoom.map((room: any) => (
        <div
          key={room.id}
          style={{
            width: '33%',
            height: '25%',
            border: '1px solid black',
            float: 'left',
            margin: '1px',
          }}
        >
          {room.id} ㅣ {room.roomname}
          <br></br>
          <button
            onClick={() => {
              console.log('방에 입장했다.');
            }}
          >
            입장
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default GreenroomrPresenter;
