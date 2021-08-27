import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CampiService } from './campi.service';
import { CampiController } from './campi.controller';
import { Campus } from './campus.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { ForgotPassword } from 'src/users/forgot-password.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campus, User, ForgotPassword])],
  providers: [CampiService, UsersService],
  controllers: [CampiController],
})
export class CampiModule {}
