import React from "react";
import "../presenterStyles/SelectCharacterPresenter.css";
import { Link } from "react-router-dom";
import { ERROR_MESSAGE } from "../common/ErrorMessages";

interface Props {
  selectedCharacter: string;
  setSelectedCharacter: any;
  isSelect: boolean;
  setIsSelect: any;
}

const SelectCharacterPresenter: React.FunctionComponent<Props> = ({
  selectedCharacter,
  setSelectedCharacter,
  isSelect,
  setIsSelect,
}: Props) => {
  return (
    <div className="Main">
      <h1 className="MainTitle">Nymph of Gladia</h1>
      <h2>- 캐릭터 선택 -</h2>

      {isSelect ? (
        <div className="selectedCharacter">{selectedCharacter}</div>
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
              setSelectedCharacter("라디");
              setIsSelect(true);
            }}
          >
            라디
          </a>
          <a
            href="#2"
            onClick={(e) => {
              e.preventDefault();
              setSelectedCharacter("레티");
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

export default SelectCharacterPresenter;
