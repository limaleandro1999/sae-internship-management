import { Controller, Get, Param, Post, Body, Put, Req, Res } from '@nestjs/common';
import { Campus } from './campus.entity';
import { CampiService } from './campi.service';
import { CreateCampusDTO } from './dto/create-campus.dto';
import { UpdateCampusDTO } from './dto/update-campus.dto';
import { RequestWithQueryInfo } from 'src/common/interfaces/request-query-info.interface';

@Controller('campi')
export class CampiController {
  constructor(private readonly campiService: CampiService) {}

  @Get()
  findAll(@Req() req: RequestWithQueryInfo): Promise<[Campus[], number]> {
    const { order, skip, filter, take } = req.queryInfo;
    return this.campiService.findAll(order, skip, take, filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Campus> {
    return this.campiService.findOne(id);
  }

  @Post()
  create(@Body() createCampusDTO: CreateCampusDTO): Promise<Campus> {
    return this.campiService.create(createCampusDTO);
  }

  @Put(':id')
  updated(@Param('id') id: string, @Body() updateCampusDTO: UpdateCampusDTO): Promise<Campus> {
    return this.campiService.update(id, updateCampusDTO);
  }
}
