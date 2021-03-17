import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Campus } from "src/campi/campus.entity";
import { User } from "src/users/user.entity";

@Entity()
export class InternshipAdvisor {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @ManyToOne(() => Campus, campus => campus.internshipAdvisors, { eager: true })
  campus: Campus | number;

  @OneToOne(() => User, user => user.internshipAdvisor)
  @JoinColumn()
  user: User | number;
}