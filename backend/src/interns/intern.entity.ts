import { Campus } from 'src/campi/campus.entity';
import { Course } from 'src/courses/course.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum ShiftOption {
  MORNING = 'Manha',
  AFTERNOON = 'Vespertino',
  NIGHT = 'Noite',
  INTEGRAL = 'Integral',
}

@Entity()
export class Intern {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  rg: string;

  @Column()
  birthDate: string;

  @Column()
  address: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  cep: string;

  @Column()
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: ShiftOption,
  })
  shift: string;

  @Column()
  registrationNumber: string;

  @Column()
  coursePeriod: string;

  @Column({
    nullable: true,
  })
  responsible?: string;

  @ManyToOne(
    () => Campus,
    campus => campus.intern,
    { eager: true },
  )
  campus: Campus | number;

  @OneToOne(
    () => User,
    user => user.intern,
    { eager: true },
  )
  @JoinColumn()
  user: User | number;

  @ManyToOne(
    () => Course,
    course => course.intern,
    { eager: true },
  )
  course: Course | number;
}
