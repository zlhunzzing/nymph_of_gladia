import React from "react";
import "../presenterStyles/MainPresenter.css";
import { Link } from "react-router-dom";

export default function MainPresenter() {
  return (
    <div className="Main">
      <h1 className="MainTitle">Nymph of Gladia</h1>
      <h2>- 검투의 요정 -</h2>

      <div className="account">
        <form className="accountForm">
          <div className="accountInputs">
            <input
              type="email"
              className="accountInput"
              placeholder="이메일을 입력 해주세요"
            ></input>
            <input
              type="password"
              className="accountInput"
              placeholder="비밀번호를 입력 해주세요"
            ></input>
          </div>
          <button className="accountButton">로그인</button>
        </form>
        <a className="accountLink" href="/signup">
          회원가입
        </a>
        <Link
          to="/singlemode"
          style={{
            textDecoration: "none",
          }}
        >
          <br></br>
          <br></br>
          <br></br>
          Play
        </Link>
      </div>
    </div>
  );
}
