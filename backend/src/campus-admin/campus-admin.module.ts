import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailsService } from 'src/emails/emails.service';
import { CampusAdminController } from './campus-admin.controller';
import { CampusAdmin } from './campus-admin.entity';
import { CampusAdminService } from './campus-admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([CampusAdmin])],
  controllers: [CampusAdminController],
  providers: [CampusAdminService, EmailsService]
})
export class CampusAdminModule {}
