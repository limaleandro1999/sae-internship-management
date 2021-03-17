import { User } from "src/users/user.entity";

export class CreateInternshipAdvisorDTO {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  campus?: number;
  user?: number | User;
}