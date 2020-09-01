import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomname: string;

  @Column()
  player1: number;

  @Column({
    default: null,
  })
  player2: number;

  @Column({
    default: 0,
  })
  headcount: number;

  @Column({
    default: 2,
  })
  maxHeadcount: number;
}
