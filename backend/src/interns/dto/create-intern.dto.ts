import { User } from 'src/users/user.entity';

export class CreateInternDTO {
  name: string;
  cpf: string;
  rg: string;
  birthDate: string;
  address: string;
  district: string;
  city: string;
  state: string;
  cep: string;
  phoneNumber: string;
  shift: string;
  registrationNumber: string;
  coursePeriod: string;
  responsible?: string;
  campus: number;
  email: string;
  user: User | number;
}
