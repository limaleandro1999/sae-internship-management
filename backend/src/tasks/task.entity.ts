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

  @Column()
  observation: string;

  @Column({ type: 'integer' })
  workedHoursAmount: number;

  @Column()
  delivered: boolean;

  @Column()
  delivereDate: Date;

  @ManyToOne(
    () => MonthlyReport,
    internshipProcess => internshipProcess.tasks,
  )
  monthlyReport: MonthlyReport;
}
