import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { resolve } from 'path';
import { Public } from 'src/common/decorators/public.decorator';
import environment from 'src/common/environment';
import { RequestWithQueryInfo } from 'src/common/interfaces/request-query-info.interface';
import { editFileName } from 'src/common/utils';
import { AdditivateInternshipProcessDTO } from './dto/addivate-internship-process.dto';
import { CreateInternshipProcessDTO } from './dto/create-interniship-process.dto';
import { FinishInternshipProcessDTO } from './dto/finish-internship-process.dto';
import { InternshipProcess } from './internship-process.entity';
import { InternshipProcessesService } from './internship-processes.service';

@Controller('internship-processes')
export class InternshipProcessesController {
  constructor(
    private readonly internshipProcessesService: InternshipProcessesService,
  ) {}
  @Get()
  findAll(
    @Req() req: RequestWithQueryInfo,
  ): Promise<[InternshipProcess[], number]> {
    const { order, skip, filter, take } = req.queryInfo;
    return this.internshipProcessesService.findAll(
      order,
      skip,
      take,
      filter,
      req.user.campusId,
    );
  }

  @Get('finish/:id')
  findOneFinishPage(@Param('id') id: string): Promise<InternshipProcess> {
    return this.internshipProcessesService.findOne(id);
  }

  @Get('time-additive/:id')
  findOneTimeAdditivePage(@Param('id') id: string): Promise<InternshipProcess> {
    return this.internshipProcessesService.findOne(id);
  }

  @Public()
  @Get(':id/:document')
  async getInternshipProcessDocument(
    @Param('id') id: string,
    @Param('document') documentName: string,
    @Res() res: Response,
  ) {
    const internshipProcess = await this.internshipProcessesService.findOne(id);
    const documentFilePath = internshipProcess[`${documentName}FileURL`];
    return res.sendFile(documentFilePath);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<InternshipProcess> {
    const internshipProcess = await this.internshipProcessesService.findOne(id);

    internshipProcess.registrationFormFileURL = internshipProcess.registrationFormFileURL
      ? `${environment().server.protocol}://${environment().server.host}:${
          environment().server.port
        }/internship-processes/${internshipProcess.id}/registrationForm`
      : null;
    internshipProcess.internshipCommitmentTermAndActivityPlanFileURL = internshipProcess.internshipCommitmentTermAndActivityPlanFileURL
      ? `${environment().server.protocol}://${environment().server.host}:${
          environment().server.port
        }/internship-processes/${
          internshipProcess.id
        }/internshipCommitmentTermAndActivityPlan`
      : null;
    internshipProcess.internEvaluationSheetFileURL = internshipProcess.internEvaluationSheetFileURL
      ? `${environment().server.protocol}://${environment().server.host}:${
          environment().server.port
        }/internship-processes/${internshipProcess.id}/internEvaluationSheet`
      : null;
    internshipProcess.finalInternshipReportFileURL = internshipProcess.finalInternshipReportFileURL
      ? `${environment().server.protocol}://${environment().server.host}:${
          environment().server.port
        }/internship-processes/${internshipProcess.id}/finalInternshipReport`
      : null;
    internshipProcess.applicationCompletionInternshipFileURL = internshipProcess.applicationCompletionInternshipFileURL
      ? `${environment().server.protocol}://${environment().server.host}:${
          environment().server.port
        }/internship-processes/${
          internshipProcess.id
        }/applicationCompletionInternship`
      : null;
    internshipProcess.internshipCompletionStatementFileURL = internshipProcess.internshipCompletionStatementFileURL
      ? `${environment().server.protocol}://${environment().server.host}:${
          environment().server.port
        }/internship-processes/${
          internshipProcess.id
        }/internshipCompletionStatement`
      : null;
    internshipProcess.internshipAgreementTerminationTermFileURL = internshipProcess.internshipAgreementTerminationTermFileURL
      ? `${environment().server.protocol}://${environment().server.host}:${
          environment().server.port
        }/internship-processes/${
          internshipProcess.id
        }/internshipAgreementTerminationTerm`
      : null;

    return internshipProcess;
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'registrationForm', maxCount: 1 },
        { name: 'internshipCommitmentTermAndActivityPlan', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: editFileName,
        }),
      },
    ),
  )
  create(
    @Req() req,
    @Body() createInternshipProcessDTO: CreateInternshipProcessDTO,
    @UploadedFiles() files,
  ) {
    createInternshipProcessDTO.mandatory =
      <string>(<unknown>createInternshipProcessDTO.mandatory) === 'true'
        ? true
        : false;
    createInternshipProcessDTO.weeklySchedule = createInternshipProcessDTO?.weeklySchedule
      ? JSON.parse(<string>createInternshipProcessDTO?.weeklySchedule)
      : null;
    createInternshipProcessDTO.registrationFormFileURL = files?.registrationForm
      ? resolve(files?.registrationForm[0]?.path)
      : null;
    createInternshipProcessDTO.internshipCommitmentTermAndActivityPlanFileURL = files?.internshipCommitmentTermAndActivityPlan
      ? resolve(files?.internshipCommitmentTermAndActivityPlan[0]?.path)
      : null;

    return this.internshipProcessesService.create(
      createInternshipProcessDTO,
      req.user.campusId,
    );
  }

  @Put('finish/:id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'internEvaluationSheet', maxCount: 1 },
        { name: 'finalInternshipReport', maxCount: 1 },
        { name: 'internshipCompletionStatement', maxCount: 1 },
        { name: 'internshipAgreementTerminationTerm', maxCount: 1 },
        { name: 'applicationCompletionInternship', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: editFileName,
        }),
      },
    ),
  )
  finishInternshipProcess(@Param('id') id: string, @UploadedFiles() files) {
    const finishInternshipProcessDTO: FinishInternshipProcessDTO = {
      internEvaluationSheetFileURL: files?.internEvaluationSheet
        ? resolve(files?.internEvaluationSheet[0].path)
        : null,
      finalInternshipReportFileURL: files?.finalInternshipReport
        ? resolve(files?.finalInternshipReport[0].path)
        : null,
      internshipCompletionStatementFileURL: files?.internshipCompletionStatement
        ? resolve(files?.internshipCompletionStatement[0].path)
        : null,
      internshipAgreementTerminationTermFileURL: files?.internshipAgreementTerminationTerm
        ? resolve(files?.internshipAgreementTerminationTerm[0].path)
        : null,
      applicationCompletionInternshipFileURL: files?.applicationCompletionInternship
        ? resolve(files?.applicationCompletionInternship[0].path)
        : null,
    };

    return this.internshipProcessesService.finishInternshipProcess(
      id,
      finishInternshipProcessDTO,
    );
  }

  @Put('time-additive/:id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'timeAdditiveTerm', maxCount: 1 }], {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
    }),
  )
  additivateInternshipProcess(
    @Param('id') id: string,
    @Body() additivateInternshipProcessDTO: AdditivateInternshipProcessDTO,
    @UploadedFiles() files,
  ) {
    additivateInternshipProcessDTO.timeAdditiveTermFileURL = files?.timeAdditiveTerm
      ? resolve(files?.timeAdditiveTerm[0].path)
      : null;

    return this.internshipProcessesService.additivateInternshipProcess(
      id,
      additivateInternshipProcessDTO,
    );
  }
}
