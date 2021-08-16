import { CreateCompanyDTO } from 'src/companies/dto/create-company.dto';
import { CreateInternDTO } from 'src/interns/dto/create-intern.dto';
import { WeeklySchedule } from '../interfaces/weekly-schedule.interface';

export interface CreateInternshipProcessDTO {
  startDate: Date;
  finishDate: Date;
  dailyWorkload: number;
  weeklyWorkload: number;
  weeklySchedule: WeeklySchedule;
  salaryAmount: number;
  policyNumber: string;
  insuranceCompany: string;
  supervisor: string;
  supervisorPosition: string;
  mandatory?: boolean;
  company: CreateCompanyDTO | number;
  intern: CreateInternDTO | number;
  internshipAdvisor: number;
  campus?: number;
  registrationFormFileURL?: string;
  internshipCommitmentTermAndActivityPlanFileURL?: string;
}
