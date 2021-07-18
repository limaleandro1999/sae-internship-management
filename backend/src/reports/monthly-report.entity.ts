import { InternshipProcess } from 'src/internship-processes/internship-process.entity';
import { Task } from 'src/tasks/task.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum ReportStatus {
  DELIVERED = 'DELIVERED',
  PENDING = 'PENDING',
  WITH_OBSERVATIONS = 'WITH_OBSERVATIONS',
}

@Entity()
export class MonthlyReport {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'timestamp' })
  deadline: Date;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  finishDate: Date;

  @Column({
    nullable: true,
  })
  notes?: string;

  @Column({ nullable: true })
  advisorComment?: string;

  @Column({ nullable: true })
  reportFileUrl?: string;

  @Column({ default: false })
  delivered: boolean;

  @Column({ nullable: true })
  deliveredDate?: Date;

  @Column({ type: 'enum', enum: ReportStatus, default: ReportStatus.PENDING })
  status: ReportStatus;

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
