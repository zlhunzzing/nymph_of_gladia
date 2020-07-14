import React, { Dispatch } from 'react';

interface Props {
  setIsTurn: Dispatch<boolean>;
}

const StadiumPresenter: React.FunctionComponent<Props> = ({
  setIsTurn,
}: Props) => (
  <div className="Main">
    <button
      onClick={() => {
        setIsTurn(false);
      }}
    >
      임시
    </button>
    <div
      style={{
        marginTop: '100px',
        border: '1px solid black',
        width: '100%',
        height: '30%',
      }}
    >
      공간
    </div>
    <div className="control">""</div>
  </div>
);

export default StadiumPresenter;
