import { Campus } from 'src/campi/campus.entity';
import { Intern } from 'src/interns/intern.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @ManyToOne(
    () => Campus,
    campus => campus.courses,
  )
  campus: Campus | number;

  @OneToMany(
    () => Intern,
    intern => intern.course,
  )
  intern: Intern | number;
}
