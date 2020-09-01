import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Campus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  emailAddress: string;

  @Column()
  city: string;
}