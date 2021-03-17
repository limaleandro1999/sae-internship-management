import { CampusAdmin } from 'src/campus-admin/campus-admin.entity';
import { Company } from 'src/companies/company.entity';
import { Course } from 'src/courses/course.entity';
import { InternshipAdvisor } from 'src/internship-advisors/internship-advisor.entity';
import { InternshipSector } from 'src/internship-sector/internship-sector.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Campus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  emailAddress: string;

  @Column()
  city: string;

  @OneToMany(() => CampusAdmin, campusAdmin => campusAdmin.campus)
  campusAdmins: CampusAdmin[];

  @OneToMany(() => InternshipSector, internshipSector => internshipSector.campus)
  internshipSectors: InternshipSector[];

  @OneToMany(() => InternshipAdvisor, internshipAdvisor => internshipAdvisor.campus)
  internshipAdvisors: InternshipAdvisor[];

  @OneToMany(() => Course, course => course.campus)
  courses: Course[];

  @OneToMany(() => Company, company => company.campus)
  companies: Company[];
}