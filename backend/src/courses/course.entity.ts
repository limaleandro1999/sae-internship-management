import { Campus } from 'src/campi/campus.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @ManyToOne(
    () => Campus,
    campus => campus.courses,
  )
  campus: Campus | number;
}
