import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
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

  @Get('/semester-reports/:id')
  async getSemesterReport(@Param('id') id: string) {
    const semesterReport = await this.reportsService.getSemesterReportById(id);
    semesterReport.reportFileUrl = this.reportsService.getReportDownloadLink(
      semesterReport,
    );

    return semesterReport;
  }

  @Get('/monthly-reports/:id')
  async getMonthlyReport(@Param('id') id: string) {
    const monthlyReport = await this.reportsService.getMonthlyReportById(id);
    monthlyReport.reportFileUrl = this.reportsService.getReportDownloadLink(
      monthlyReport,
    );

    return monthlyReport;
  }
}
