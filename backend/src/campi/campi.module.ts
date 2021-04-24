import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CampiService } from './campi.service';
import { CampiController } from './campi.controller';
import { Campus } from './campus.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campus, User])],
  providers: [CampiService, UsersService],
  controllers: [CampiController],
})
export class CampiModule {}
