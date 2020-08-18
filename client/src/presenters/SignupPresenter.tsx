import React, { Dispatch } from 'react';
import * as apis from '../apis/Auth';

interface Props {
  email: string;
  setEmail: Dispatch<string>;
  password: string;
  setPassword: Dispatch<string>;
  username: string;
  setUsername: Dispatch<string>;
  history: any;
}

const SignupPresenter: React.FunctionComponent<Props> = ({
  email,
  setEmail,
  password,
  setPassword,
  username,
  setUsername,
  history,
}: Props) => {
  return (
    <div className="Main">
      <h1 className="MainTitle">Nymph of Gladia</h1>
      <h2>회원가입</h2>

      <div className="account">
        <form
          className="accountForm"
          onSubmit={(e) => {
            e.preventDefault();
            apis.signup(email, password, username, history);
          }}
        >
          <div>
            <input
              type="email"
              className="accountInput"
              placeholder="이메일을 입력 해주세요"
              onChange={({ target: { value } }) => setEmail(value)}
            ></input>
            <input
              type="password"
              className="accountInput"
              placeholder="비밀번호를 입력 해주세요"
              onChange={({ target: { value } }) => setPassword(value)}
            ></input>
            <input
              type="text"
              className="accountInput"
              placeholder="이름을 입력 해주세요"
              onChange={({ target: { value } }) => setUsername(value)}
            ></input>
          </div>
          <a className="accountLink" href="/">
            로그인
          </a>
          <br></br>
          <button className="accountButton" type="submit">
            가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPresenter;
