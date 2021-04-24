import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailsService } from 'src/emails/emails.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { CampusAdminController } from './campus-admin.controller';
import { CampusAdmin } from './campus-admin.entity';
import { CampusAdminService } from './campus-admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([CampusAdmin, User])],
  controllers: [CampusAdminController],
  providers: [CampusAdminService, EmailsService, UsersService],
})
export class CampusAdminModule {}
