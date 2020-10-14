import { CampusAdmin } from 'src/campus-admin/campus-admin.entity';
import { Course } from 'src/courses/course.entity';
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

  @OneToMany(() => Course, course => course.campus)
  courses: Course[];
}