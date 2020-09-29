import { hash } from "bcrypt";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 } from "uuid";

export enum UserType {
  ADMIN = 'Admin',
  CAMPUS_ADMIN = 'Campus_Admin',
  INTERNSHIP_SECTOR = 'Internship_Sector',
  INTERNSHIP_TUTOR = 'Internship_Tutor',
  INTERN = 'Intern', 
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({
    unique: true
  })
  email: string;

  @Column({
    nullable: true
  })
  password: string;

  @Column()
  confirmationId: string;

  @Column()
  type: UserType;

  @Column({
    default: false,
  })
  active: boolean;

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
}