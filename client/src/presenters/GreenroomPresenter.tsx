import React, { Dispatch } from 'react';
import '../presenterStyles/GreenroomPresenter.css';

interface Props {
  dummyRoom: Array<object>;
  setRoomname: Dispatch<string>;
  isModal: boolean;
  setIsModal: Dispatch<boolean>;
}

const GreenroomrPresenter: React.FunctionComponent<Props> = ({
  dummyRoom,
  setRoomname,
  isModal,
  setIsModal,
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
            width: '25%',
            height: '20%',
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
    <br></br>
    <button
      onClick={() => {
        setIsModal(true);
      }}
    >
      방만들기
    </button>
    <div
      className="wrapper"
      style={{
        display: isModal ? 'block' : 'none',
      }}
    >
      <form
        className="createRoom"
        onSubmit={(e) => {
          e.preventDefault();
          setIsModal(false);
          // apis.signin(email, password, history);
        }}
      >
        방 제목을 입력하시오.
        <br></br>
        <input
          type="text"
          className="accountInput"
          onChange={({ target: { value } }) => setRoomname(value)}
        ></input>
        <br></br>
        <button type="submit">확인</button>
      </form>
    </div>
  </div>
);

export default GreenroomrPresenter;
