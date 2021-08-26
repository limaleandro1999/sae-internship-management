import { Module } from '@nestjs/common';
import { InternshipSectorService } from './internship-sector.service';
import { InternshipSectorController } from './internship-sector.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternshipSector } from './internship-sector.entity';
import { User } from 'src/users/user.entity';
import { EmailsService } from 'src/emails/emails.service';
import { UsersService } from 'src/users/users.service';
import { ForgotPassword } from 'src/users/forgot-password.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InternshipSector, User, ForgotPassword])],
  providers: [InternshipSectorService, EmailsService, UsersService],
  controllers: [InternshipSectorController],
})
export class InternshipSectorModule {}
