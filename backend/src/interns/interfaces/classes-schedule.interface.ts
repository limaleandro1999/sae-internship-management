export interface ClassesDailySchedule {
  morningAB: boolean; // 7:40 - 9:40
  morningCD: boolean; // 10:00 - 12:00
  afternoonAB: boolean; // 13:40 - 14:40
  afternoonCD: boolean; // 15:00 - 18:00
  nightAB: boolean;
  nightCD: boolean;
}

export interface ClassesSchedule {
  monday?: ClassesDailySchedule;
  tuesday?: ClassesDailySchedule;
  wednesday?: ClassesDailySchedule;
  thursday?: ClassesDailySchedule;
  friday?: ClassesDailySchedule;
}
