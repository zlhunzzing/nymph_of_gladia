import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomname: string;

  @Column()
  player1: number;
}
