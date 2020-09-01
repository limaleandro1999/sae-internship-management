import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CampiService } from './campi.service';
import { CampiController } from './campi.controller';
import { Campus } from './campus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campus])],
  providers: [CampiService],
  controllers: [CampiController]
})
export class CampiModule {}
