import { Campus } from 'src/campi/campus.entity';
import { Company } from 'src/companies/company.entity';
import { Intern } from 'src/interns/intern.entity';
import { InternshipAdvisor } from 'src/internship-advisors/internship-advisor.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column({ type: 'int' }) // salary amount in cents
  salaryAmount: number;

  @Column()
  policyNumber: string;

  @Column()
  insuranceCompany: string;

  @Column()
  supervisor: string;

  @Column()
  supervisorPosition: string;

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
}
