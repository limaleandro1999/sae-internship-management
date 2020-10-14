import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Campus } from "src/campi/campus.entity";
import { User } from "src/users/user.entity";

@Entity()
export class InternshipSector {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  registrationNumber: string;

  @ManyToOne(() => Campus, campus => campus.campusAdmins)
  campus: Campus | number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User | number;
}