import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Campus } from 'src/campi/campus.entity';
import { User } from 'src/users/user.entity';
import { InternshipProcess } from 'src/internship-processes/internship-process.entity';

@Entity()
export class InternshipAdvisor {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({
    nullable: true,
  })
  siape: string;

  @ManyToOne(
    () => Campus,
    campus => campus.internshipAdvisors,
    { eager: true },
  )
  campus: Campus | number;

  @OneToOne(
    () => User,
    user => user.internshipAdvisor,
  )
  @JoinColumn()
  user: User | number;

  @OneToMany(
    () => InternshipProcess,
    internshipProcess => internshipProcess.internshipAdvisor,
  )
  internshipProcesses: InternshipProcess[];
}
