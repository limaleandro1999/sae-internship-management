import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findUser(email);

    if (user && user.active && (await compare(password, user.password))) {
      user.password = undefined;
      return user;
    }

    return null;
  }

  login(user: User) {
    const payload = {
      email: user.email,
      sub: user.id,
      campusId: user.getCampusId(),
    };

    return {
      access_token: this.jwtService.sign(payload),
      ...user,
    };
  }
}
