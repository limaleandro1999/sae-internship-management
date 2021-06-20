import { InternshipProcess } from 'src/internship-processes/internship-process.entity';
import { MonthlyReport } from 'src/reports/monthly-report.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  activity: string;

  @Column({ nullable: true })
  observation?: string;

  @Column({ type: 'integer' })
  workedHoursAmount: number;

  @Column()
  delivered: boolean;

  @Column({
    type: 'date',
    nullable: true,
  })
  deliveredDate?: Date;

  @ManyToOne(
    () => MonthlyReport,
    monthlyReport => monthlyReport.tasks,
  )
  monthlyReport: MonthlyReport;

  @ManyToOne(
    () => InternshipProcess,
    internshipProcess => internshipProcess.tasks,
    { nullable: true },
  )
  internshipProcess: InternshipProcess;
}
