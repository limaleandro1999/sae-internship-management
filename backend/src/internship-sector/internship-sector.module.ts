import { Module } from '@nestjs/common';
import { InternshipSectorService } from './internship-sector.service';
import { InternshipSectorController } from './internship-sector.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternshipSector } from './internship-sector.entity';
import { User } from 'src/users/user.entity';
import { EmailsService } from 'src/emails/emails.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([InternshipSector, User])],
  providers: [InternshipSectorService, EmailsService, UsersService],
  controllers: [InternshipSectorController]
})
export class InternshipSectorModule {}
