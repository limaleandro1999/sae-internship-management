import { hash } from 'bcrypt';
import { CampusAdmin } from 'src/campus-admin/campus-admin.entity';
import { Intern } from 'src/interns/intern.entity';
import { InternshipAdvisor } from 'src/internship-advisors/internship-advisor.entity';
import { InternshipSector } from 'src/internship-sector/internship-sector.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 } from 'uuid';

export enum UserType {
  ADMIN = 'Admin',
  CAMPUS_ADMIN = 'Campus_Admin',
  INTERNSHIP_SECTOR = 'Internship_Sector',
  INTERNSHIP_ADVISOR = 'Internship_Advisor',
  INTERN = 'Intern',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  password: string;

  @Column()
  confirmationId: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.INTERN,
  })
  type: UserType;

  @Column({
    default: false,
  })
  active: boolean;

  @OneToOne(
    () => InternshipSector,
    internshipSector => internshipSector.user,
    { eager: true },
  )
  internshipSector: InternshipSector;

  @OneToOne(
    () => CampusAdmin,
    campusAdmin => campusAdmin.user,
    { eager: true },
  )
  campusAdmin: CampusAdmin;

  @OneToOne(
    () => InternshipAdvisor,
    internshipAdvisor => internshipAdvisor.user,
    { eager: true },
  )
  internshipAdvisor: InternshipAdvisor;

  @OneToOne(
    () => Intern,
    intern => intern.user,
  )
  intern: Intern;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await hash(this.password, 10);
    }
  }

  @BeforeInsert()
  generateConfirmationId() {
    this.confirmationId = v4();
  }

  getCampusId(): number {
    switch (this.type) {
      case UserType.CAMPUS_ADMIN:
        return typeof this.campusAdmin.campus === 'number'
          ? this.campusAdmin.campus
          : this.campusAdmin.campus.id;

      case UserType.INTERNSHIP_SECTOR:
        return typeof this.internshipSector.campus === 'number'
          ? this.internshipSector.campus
          : this.internshipSector.campus.id;

      default:
        return null;
    }
  }
}
