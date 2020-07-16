export interface User {
  name: string;
  hp: number;
  mp: number;
  basicCards: Array<object>;
  uniqueCards: Array<object>;
}

export interface Card {
  type: string;
  speed: number;
}
