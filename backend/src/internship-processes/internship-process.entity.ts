import { Campus } from 'src/campi/campus.entity';
import { Company } from 'src/companies/company.entity';
import { Intern } from 'src/interns/intern.entity';
import { InternshipAdvisor } from 'src/internship-advisors/internship-advisor.entity';
import { MonthlyReport } from 'src/reports/monthly-report.entity';
import { SemesterReport } from 'src/reports/semester-report.entity';
import { Task } from 'src/tasks/task.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AdditiveTerm } from './additive-term.entity';
import { WeeklySchedule } from './interfaces/weekly-schedule.interface';

export enum InternshipProcessStatus {
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}
@Entity()
export class InternshipProcess {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  finishDate: Date;

  @Column()
  dailyWorkload: number;

  @Column()
  weeklyWorkload: number;

  @Column({ type: 'json' })
  weeklySchedule: WeeklySchedule;

  @Column({ type: 'float', nullable: true })
  salaryAmount: number;

  @Column()
  policyNumber: string;

  @Column()
  insuranceCompany: string;

  @Column()
  supervisor: string;

  @Column()
  supervisorPosition: string;

  @Column({ nullable: true })
  registrationFormFileURL?: string;

  @Column({ nullable: true })
  internshipCommitmentTermAndActivityPlanFileURL?: string;

  @Column({ nullable: true })
  internEvaluationSheetFileURL?: string;

  @Column({ nullable: true })
  finalInternshipReportFileURL?: string;

  @Column({ nullable: true })
  applicationCompletionInternshipFileURL?: string;

  @Column({ nullable: true })
  internshipCompletionStatementFileURL?: string;

  @Column({ nullable: true })
  internshipAgreementTerminationTermFileURL?: string;

  @Column({ nullable: true })
  SEINumber?: string;

  @Column({
    type: 'enum',
    enum: InternshipProcessStatus,
    default: InternshipProcessStatus.ACTIVE,
  })
  status: InternshipProcessStatus;

  @Column({ default: false })
  mandatory: boolean;

  @ManyToOne(
    () => Company,
    company => company.internshipProcesses,
  )
  company: Company | number;

  @ManyToOne(
    () => Intern,
    intern => intern.internshipProcesses,
  )
  intern: Intern | number;

  @ManyToOne(
    () => InternshipAdvisor,
    internshipAdvisor => internshipAdvisor.internshipProcesses,
  )
  internshipAdvisor: InternshipAdvisor | number;

  @ManyToOne(
    () => Campus,
    campus => campus.internshipProcesses,
    { eager: true },
  )
  campus: Campus | number;

  @OneToMany(
    () => SemesterReport,
    internshipProcess => internshipProcess.internshipProcess,
  )
  semesterReports: SemesterReport[];

  @OneToMany(
    () => MonthlyReport,
    monthlyReport => monthlyReport.internshipProcess,
  )
  monthlyReports: MonthlyReport[];

  @OneToMany(
    () => Task,
    task => task.internshipProcess,
  )
  tasks: Task[];

  @OneToMany(
    () => AdditiveTerm,
    additiveTerms => additiveTerms.internshipProcess,
  )
  additiveTerms: AdditiveTerm[];
}
