import { Controller, Get, Param, Post, Body, Put, Req } from '@nestjs/common';
import { Company } from './company.entity';
import { CompaniesService } from './companies.service';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { UpdateCompanyDTO } from './dto/update-company.dto';
import { RequestWithQueryInfo } from 'src/common/interfaces/request-query-info.interface';

@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly companyService: CompaniesService
  ) {}

  @Get()
  findAll(@Req() req: RequestWithQueryInfo): Promise<[Company[], number]> {
    const { order, skip, filter, take } = req.queryInfo;
    return this.companyService.findAll(order, skip, take, filter, req.user.campusId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Company> {
    return this.companyService.findOne(id);
  }

  @Post()
  create(@Req() req: RequestWithQueryInfo, @Body() createCompanyDTO: CreateCompanyDTO): Promise<Company> {
    return this.companyService.create(createCompanyDTO, req.user.campusId);
  }

  @Put(':id')
  updated(@Param('id') id: string, @Body() updateCompanyDTO: UpdateCompanyDTO): Promise<Company> {
    return this.companyService.update(id, updateCompanyDTO);
  }
}
