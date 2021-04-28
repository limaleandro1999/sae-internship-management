import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Campus } from './campus.entity';
import { CampiService } from './campi.service';
import { CreateCampusDTO } from './dto/create-campus.dto';
import { UpdateCampusDTO } from './dto/update-campus.dto';
import { RequestWithQueryInfo } from 'src/common/interfaces/request-query-info.interface';
import { UsersService } from 'src/users/users.service';
import { UserType } from 'src/users/user.entity';
import { Response } from 'express';

@Controller('campi')
export class CampiController {
  constructor(
    private readonly campiService: CampiService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async findAll(
    @Req() req: RequestWithQueryInfo,
    @Res() res: Response,
  ): Promise<[Campus[], number] | Response<any, Record<string, any>>> {
    // TODO: Use roles instead of this logic
    const user = await this.usersService.findUser(req.user.email);

    if (user.type !== UserType.ADMIN) {
      return res.status(403);
    }

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
  update(
    @Param('id') id: string,
    @Body() updateCampusDTO: UpdateCampusDTO,
  ): Promise<Campus> {
    return this.campiService.update(id, updateCampusDTO);
  }
}
