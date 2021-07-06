import { ClassesSchedule } from '../interfaces/classes-schedule.interface';

export class UpdateInternDTO {
  name?: string;
  cpf?: string;
  rg?: string;
  birthDate?: string;
  address?: string;
  district?: string;
  city?: string;
  state?: string;
  cep?: string;
  phoneNumber?: string;
  shift?: string;
  registrationNumber?: string;
  coursePeriod?: string;
  email?: string;
  responsible?: string;
  classesSchedule?: ClassesSchedule;
}
