export interface Player {
  name: string;
  hp: number;
  mp: number;
  basicCards: Array<object>;
  uniqueCards: Array<object>;
}

export interface Position {
  x: number;
  y: number;
}

export interface Card {
  type: string;
  speed: number;
  cost: number;
  power: number;
  range: Array<Array<number>>;
  position: string;
}
