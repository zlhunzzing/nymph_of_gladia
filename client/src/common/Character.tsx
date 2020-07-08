export default class Character {
  name: string;

  hp: number;

  mp: number;

  xPosition: number;

  yPosition: number;

  constructor(name: string) {
    this.name = name;
    this.hp = 100;
    this.mp = 100;
    this.xPosition = 0;
    this.yPosition = 0;
  }

  move(action: string) {
    switch (action) {
      case 'UP':
        this.yPosition += 1;
        break;
      case 'DOWN':
        this.yPosition -= 1;
        break;
      case 'LEFT':
        this.xPosition += 1;
        break;
      case 'RIGHT':
        this.xPosition -= 1;
        break;
      default:
        break;
    }
  }
}

export function getCharacter(name: string) {
  return new Character(name);
}
