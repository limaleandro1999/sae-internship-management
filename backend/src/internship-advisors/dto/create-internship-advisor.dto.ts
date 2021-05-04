import { User } from 'src/users/user.entity';

export class CreateInternshipAdvisorDTO {
  name: string;
  email: string;
  phone: string;
  campus?: number;
  user?: number | User;
}
