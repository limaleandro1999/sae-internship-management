import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InternshipProcess } from './internship-process.entity';

@Entity()
export class AdditiveTerm {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  timeAdditiveTermFileURL?: string;

  @Column({ type: 'date' })
  previousFinishDate: Date;

  @Column({ type: 'date' })
  newFinishDate: Date;

  @ManyToOne(
    () => InternshipProcess,
    internshipProcess => internshipProcess.additiveTerms,
  )
  internshipProcess: InternshipProcess | number;
}
