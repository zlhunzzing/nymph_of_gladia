import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  roomname: string;

  @Column({ default: null })
  host: number;

  @Column({
    default: 0,
  })
  headcount: number;

  @Column({
    default: 2,
  })
  maxHeadcount: number;

  @Column({ default: null })
  player1: number;

  @Column({
    default: null,
  })
  player2: number;

  @Column({
    default: null,
  })
  player1name: string;

  @Column({
    default: null,
  })
  player2name: string;

  @Column({
    default: null,
  })
  player1Socket: string;

  @Column({
    default: null,
  })
  player2Socket: string;

  @Column({
    default: null,
  })
  player1Character: string;

  @Column({
    default: null,
  })
  player2Character: string;

  @Column({
    default: false,
  })
  player1Ready: boolean;

  @Column({
    default: false,
  })
  player2Ready: boolean;

  @Column({
    default: false,
  })
  player1set: boolean;

  @Column({
    default: false,
  })
  player2set: boolean;
}
