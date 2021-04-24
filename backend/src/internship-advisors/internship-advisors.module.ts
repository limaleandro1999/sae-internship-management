import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternshipAdvisorsService } from './internship-advisors.service';
import { InternshipAdvisorsController } from './internship-advisors.controller';
import { InternshipAdvisor } from './internship-advisor.entity';
import { User } from 'src/users/user.entity';
import { EmailsService } from 'src/emails/emails.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([InternshipAdvisor, User])],
  providers: [InternshipAdvisorsService, EmailsService, UsersService],
  controllers: [InternshipAdvisorsController],
})
export class InternshipAdvisorsModule {}
