import { Campus } from 'src/campi/campus.entity';
import { InternshipProcess } from 'src/internship-processes/internship-process.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column()
  stateRegistration: string;

  @Column()
  address: string;

  @Column({
    nullable: true,
  })
  complement: string;

  @Column()
  district: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  cep: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  industry: string;

  @Column()
  internshipAreaInterest: string;

  @Column()
  representative: string;

  @Column()
  office: string;

  @Column()
  sector: string;

  @Column()
  representativePhone: string;

  @Column({ default: false })
  institutionAgreement: boolean;

  @Column({
    type: 'date',
    nullable: true,
  })
  institutionAgreementStartDate: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  institutionAgreementFinishDate: Date;

  @ManyToOne(
    () => Campus,
    campus => campus.companies,
  )
  campus: Campus | number;

  @OneToMany(
    () => InternshipProcess,
    internshipProcess => internshipProcess.company,
  )
  internshipProcesses: InternshipProcess[];
}
