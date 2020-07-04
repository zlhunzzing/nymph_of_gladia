import React from "react";
import "../presenterStyles/SinglemodePresenter.css";
import { Link } from "react-router-dom";
import { ERROR_MESSAGE } from "../common/ErrorMessages";

interface Props {
  selectedGla: string;
  setSelectedGla: any;
  isSelect: boolean;
  setIsSelect: any;
}

const SinglemodePresenter: React.FunctionComponent<Props> = ({
  selectedGla,
  setSelectedGla,
  isSelect,
  setIsSelect,
}: Props) => {
  return (
    <div className="Main">
      <h1 className="MainTitle">Nymph of Gladia</h1>
      <h2>- 싱글모드 -</h2>

      {isSelect ? (
        <div className="selectedCharacter">{selectedGla}</div>
      ) : (
        <div className="selectedCharacter">{ERROR_MESSAGE.UNSELECT}</div>
      )}
      <ul className="select">
        <li>
          <a
            href="#1"
            className="characters"
            onClick={(e) => {
              e.preventDefault();
              setSelectedGla("라디");
              setIsSelect(true);
            }}
          >
            라디
          </a>
          <a
            href="#2"
            onClick={(e) => {
              e.preventDefault();
              setSelectedGla("레티");
              setIsSelect(true);
            }}
          >
            레티
          </a>
        </li>
      </ul>
      <br></br>
      <Link
        to=""
        style={{
          textDecoration: "none",
        }}
        onClick={(e) => {
          if (!isSelect) {
            e.preventDefault();
            alert("캐릭터를 선택해주세요.");
          }
        }}
      >
        결정
      </Link>
      <br></br>
      <Link
        to="/main"
        style={{
          textDecoration: "none",
        }}
      >
        뒤로가기
      </Link>
    </div>
  );
};

export default SinglemodePresenter;
