import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';
import * as dayjs from 'dayjs';
import { ConfirmUserDTO } from './dto/confirm-user.dto';
import { CreateUserDTO } from './dto/create-user-dto';
import { ForgotPassword } from './forgot-password.entity';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(ForgotPassword)
    private forgotPasswordRepository: Repository<ForgotPassword>,
  ) {}

  create(createUserDto: CreateUserDTO): Promise<User> {
    const userObj = this.userRepository.create({ ...createUserDto });
    return this.userRepository.save(userObj);
  }

  async isValid(email: string, confirmationId: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email, confirmationId },
    });
    return !!user;
  }

  async isConfirmed(confirmationId: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { confirmationId, active: true },
    });
    return !!user;
  }

  async confirmUser(confirmUserDTO: ConfirmUserDTO) {
    const { confirmationId, password, email } = confirmUserDTO;
    const user = await this.userRepository.findOne({
      where: { email, confirmationId },
      loadEagerRelations: false,
    });
    user.password = password;
    user.active = true;

    return this.userRepository.update({ confirmationId }, user);
  }

  findUser(email: string) {
    return this.userRepository.findOne({ email });
  }

  async findUserById(id: number) {
    return this.userRepository.findOne(id);
  }

  generateForgotPasswordToken(user: User): Promise<ForgotPassword> {
    if (!user) {
      throw new Error(`needs a valid user. got ${JSON.stringify(user)}`);
    }

    return this.forgotPasswordRepository.save({
      user,
      token: randomBytes(32).toString('hex'),
      expirationTime: dayjs().add(1, 'hour'),
    });
  }

  async resetPassword(user: User, token: string, password: string) {
    const forgetPasswordObj = await this.forgotPasswordRepository.findOne({
      where: {
        user: user?.id,
        token,
      },
    });

    if (!forgetPasswordObj) {
      throw new Error(`Token invalid or doesn't exist`);
    }

    if (
      dayjs(forgetPasswordObj.expirationTime).diff(dayjs(), 'milliseconds') < 0
    ) {
      throw new Error('Token expired');
    }

    await this.forgotPasswordRepository.delete(forgetPasswordObj.id);

    const userObj = this.userRepository.create({
      ...user,
      password,
    });
    return this.userRepository.save(userObj);
  }
}
