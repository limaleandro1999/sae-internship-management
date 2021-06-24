import { InternshipProcess } from 'src/internship-processes/internship-process.entity';
import { Task } from 'src/tasks/task.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MonthlyReport {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  finishDate: Date;

  @Column({
    nullable: true,
  })
  notes?: string;

  @ManyToOne(
    () => InternshipProcess,
    internshipProcess => internshipProcess.monthlyReports,
  )
  internshipProcess: InternshipProcess;

  @OneToMany(
    () => Task,
    task => task.monthlyReport,
  )
  tasks: Task[];
}
