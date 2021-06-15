import { InternshipProcess } from 'src/internship-processes/internship-process.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EvaluationTopics } from './interfaces/intern-evaluation.interface';

@Entity()
export class SemesterReport {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'date' })
  deadline: Date;

  @Column()
  delivered: boolean;

  @Column()
  delivereDate: Date;

  @Column()
  startDate: Date;

  @Column()
  finishDate: Date;

  @Column()
  activities: string;

  @Column()
  comments: string;

  @Column({ type: 'json' })
  evaluation: EvaluationTopics;

  @ManyToOne(
    () => InternshipProcess,
    internshipProcess => internshipProcess.semesterReports,
  )
  internshipProcess: InternshipProcess;
}
