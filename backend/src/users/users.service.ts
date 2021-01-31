import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfirmUserDTO } from './dto/confirm-user.dto';
import { CreateUserDTO } from './dto/create-user-dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}

  create(createUserDto: CreateUserDTO): Promise<User> {
    const campusAdminObj = this.userRepository.create({ ...createUserDto });
    return this.userRepository.save(campusAdminObj);
  }

  async isValid(email: string, confirmationId: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email, confirmationId } });
    return !!user;
  }

  async isConfirmed(confirmationId: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { confirmationId, active: true } });
    return !!user;
  }

  async confirmUser(confirmUserDTO: ConfirmUserDTO) {
    const { confirmationId, password, email } = confirmUserDTO;
    const user = await this.userRepository.findOne({ where: { email, confirmationId } });
    user.password = password;
    user.active = true;
    
    return this.userRepository.update({ confirmationId }, user);
  }

  findUser(email: string) {
    return this.userRepository.findOne({ email });
  }
}
