import React /*, { Dispatch }*/ from 'react';
// import store from '..';
// import * as handleModalActions from '../modules/HandleModal';
import '../presenterStyles/GreenroomPresenter.css';

interface Props {
  dummyRoom: Array<object>;
  // setRoomname: Dispatch<string>;
}

const GreenroomrPresenter: React.FunctionComponent<Props> = ({
  dummyRoom,
}: // setRoomname,
Props) => (
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
        // store.dispatch(handleModalActions.setModalIsOpen({ isOpen: true }));
      }}
    >
      방만들기
    </button>
    {/* <form
      className="createRoom"
      // style={{
      //   display: 'absolute',
      //   width: '300px',
      //   height: '100px',
      //   border: '1px solid black',
      //   marginTop: '-300px',
      //   marginLeft: '250px',
      //   boxShadow: 'rgba(0,0,0,0.5) 0 0 0 9999px',
      //   z-index
      // }}
      onSubmit={(e) => {
        e.preventDefault();
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
    </form> */}
  </div>
);

export default GreenroomrPresenter;
