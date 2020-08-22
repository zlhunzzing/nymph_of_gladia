import React from 'react';

interface Props {
  a: number;
}

const GreenroomrPresenter: React.FunctionComponent<Props> = ({ a }: Props) => (
  <div className="Main">입장</div>
);

export default GreenroomrPresenter;
