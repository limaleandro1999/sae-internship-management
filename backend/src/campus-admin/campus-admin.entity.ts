import { hash } from "bcrypt";
import { Campus } from "src/campi/campus.entity";
import { User } from "src/users/user.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CampusAdmin extends User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Campus, campus => campus.campusAdmins)
  campus: Campus | number;

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
}