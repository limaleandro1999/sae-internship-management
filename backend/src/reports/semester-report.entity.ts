import { InternshipProcess } from 'src/internship-processes/internship-process.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EvaluationTopics } from './interfaces/intern-evaluation.interface';

@Entity()
export class SemesterReport {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'date' })
  deadline: Date;

  @Column({ default: false })
  delivered: boolean;

  @Column({ nullable: true })
  deliveredDate?: Date;

  @Column()
  startDate: Date;

  @Column()
  finishDate: Date;

  @Column({ nullable: true })
  advisorComment?: string;

  @Column({ nullable: true })
  activities?: string;

  @Column({ nullable: true })
  comments?: string;

  @Column({ nullable: true })
  reportFileUrl?: string;

  @Column({ type: 'json', nullable: true })
  evaluation?: EvaluationTopics;

  @ManyToOne(
    () => InternshipProcess,
    internshipProcess => internshipProcess.semesterReports,
  )
  internshipProcess: number | InternshipProcess;
}
