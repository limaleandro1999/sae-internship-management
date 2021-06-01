import { Campus } from 'src/campi/campus.entity';
import { Course } from 'src/courses/course.entity';
import { InternshipProcess } from 'src/internship-processes/internship-process.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToMany(
    () => InternshipProcess,
    internshipProcess => internshipProcess.intern,
  )
  internshipProcesses: InternshipProcess[];
}
