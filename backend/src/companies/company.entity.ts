import { Campus } from 'src/campi/campus.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  directorName: string;

  @Column()
  cnpj: string;

  @Column()
  stateRegistration: string;

  @Column()
  address: string;

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

  @ManyToOne(
    () => Campus,
    campus => campus.companies,
  )
  campus: Campus | number;
}
