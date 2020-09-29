import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user-dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService){}
}
