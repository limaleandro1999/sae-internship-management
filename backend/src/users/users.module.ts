import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailsService } from 'src/emails/emails.service';
import { ForgotPassword } from './forgot-password.entity';

import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, ForgotPassword])],
  controllers: [UsersController],
  providers: [UsersService, EmailsService],
  exports: [UsersService],
})
export class UsersModule {}
