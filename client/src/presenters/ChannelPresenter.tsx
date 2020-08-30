import React, { Dispatch } from 'react';
import '../presenterStyles/ChannelPresenter.css';

interface Props {
  rooms: Array<object>;
  setRoomname: Dispatch<string>;
  isModal: boolean;
  setIsModal: Dispatch<boolean>;
  createRoom: Function;
  isUser: boolean;
}

const ChannelPresenter: React.FunctionComponent<Props> = ({
  rooms,
  setRoomname,
  isModal,
  setIsModal,
  createRoom,
  isUser,
}: Props) => (
  <div className="Main">
    <br></br>
    <br></br>
    <br></br>
    <div
      style={{
        display: 'inline-block',
        width: '600px',
        height: '450px',
        border: '1px solid black',
      }}
    >
      {rooms.map((room: any) => (
        <div
          key={room.id}
          style={{
            // width: '25%',
            // height: '20%',
            width: '100px',
            height: '50px',
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
          if (isUser) createRoom();
          // apis.signin(email, password, history);
        }}
      >
        {isUser ? '방 제목을 입력하시오.' : '방을 만들려면 로그인 해야합니다'}
        <br></br>
        {isUser ? (
          <input
            type="text"
            className="accountInput"
            onChange={({ target: { value } }) => setRoomname(value)}
          ></input>
        ) : null}
        <br></br>
        <button type="submit">확인</button>
      </form>
    </div>
  </div>
);

export default ChannelPresenter;
