import { Module } from '@nestjs/common';
import { InternsService } from './interns.service';
import { InternsController } from './interns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Intern } from './intern.entity';
import { EmailsService } from 'src/emails/emails.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Intern, User])],
  providers: [InternsService, EmailsService, UsersService],
  controllers: [InternsController],
})
export class InternsModule {}
