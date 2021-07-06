import { InternshipProcess } from 'src/internship-processes/internship-process.entity';

export interface CreateSemesterReportDTO {
  deadline: Date;
  delivered?: boolean;
  delivereDate?: Date;
  startDate: Date;
  finishDate: Date;
  activities?: string;
  comments?: string;
  internshipProcess: number | InternshipProcess;
}
