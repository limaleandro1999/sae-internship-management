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
import { ClassesSchedule } from './interfaces/classes-schedule.interface';

const classesScheduleDefaultValue: ClassesSchedule = {
  monday: {
    morningAB: false,
    morningCD: false,
    afternoonAB: false,
    afternoonCD: false,
    nightAB: false,
    nightCD: false,
  },
  tuesday: {
    morningAB: false,
    morningCD: false,
    afternoonAB: false,
    afternoonCD: false,
    nightAB: false,
    nightCD: false,
  },
  wednesday: {
    morningAB: false,
    morningCD: false,
    afternoonAB: false,
    afternoonCD: false,
    nightAB: false,
    nightCD: false,
  },
  thursday: {
    morningAB: false,
    morningCD: false,
    afternoonAB: false,
    afternoonCD: false,
    nightAB: false,
    nightCD: false,
  },
  friday: {
    morningAB: false,
    morningCD: false,
    afternoonAB: false,
    afternoonCD: false,
    nightAB: false,
    nightCD: false,
  },
};

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

  @Column({
    type: 'json',
    default: classesScheduleDefaultValue,
    nullable: true,
  })
  classesSchedule?: ClassesSchedule;

  @ManyToOne(
    () => Campus,
    campus => campus.intern,
    { eager: true },
  )
  campus: Campus | number;

  @OneToOne(
    () => User,
    user => user.intern,
    // { eager: true },
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
