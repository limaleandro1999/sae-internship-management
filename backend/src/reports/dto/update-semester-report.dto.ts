export interface UpdateSemesterReportDTO {
  reportFileUrl?: string;
  delivered?: boolean;
  deliveredDate?: Date;
  advisorComment?: string;
  finishDate?: Date;
}
