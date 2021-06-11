export interface DailySchedule {
  start?: Date;
  finish?: Date;
}

export interface WeeklySchedule {
  monday?: DailySchedule;
  tuesday?: DailySchedule;
  wednesday?: DailySchedule;
  thursday?: DailySchedule;
  friday?: DailySchedule;
}
