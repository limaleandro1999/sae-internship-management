import { Body, Controller, Post, Req } from '@nestjs/common';
import { RequestWithQueryInfo } from 'src/common/interfaces/request-query-info.interface';
import { CreateMonthlyReportDTO } from './dto/create-monthly-report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}
  @Post('/monthly')
  createMonthlyReport(
    @Req() req: RequestWithQueryInfo,
    @Body() createMonthlyReportDTO: CreateMonthlyReportDTO,
  ) {
    return this.reportsService.createMonthlyReport(
      req.user.email,
      createMonthlyReportDTO,
    );
  }
}
