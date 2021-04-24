import { UserType } from '../user.entity';

export class CreateUserDTO {
  email: string;
  active: boolean;
  type: UserType;
}
