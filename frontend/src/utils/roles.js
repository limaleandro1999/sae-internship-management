export const ROLES = {
  ADMIN: 'Admin',
  CAMPUS_ADMIN: 'Campus_Admin',
  INTERNSHIP_SECTOR: 'Internship_Sector',
  INTERNSHIP_TUTOR: 'Internship_Tutor',
  INTERN: 'Intern',
};

export const CLIENT_NAMES = {
  INTERN: 'interns',
  INTERNSHIP_SECTOR: 'internship-sector',
  INTERNSHIP_TUTOR: 'internship-advisor',
};

export const CLIENT_ALLOWED_ROLES = {
  [CLIENT_NAMES.INTERN]: [ROLES.INTERN],
  [CLIENT_NAMES.INTERNSHIP_SECTOR]: [
    ROLES.CAMPUS_ADMIN,
    ROLES.CAMPUS_ADMIN,
    ROLES.INTERNSHIP_SECTOR,
  ],
  [CLIENT_NAMES.INTERNSHIP_TUTOR]: [ROLES.INTERNSHIP_TUTOR],
};
