import { Column } from "typeorm";

export abstract class User {
  @Column({
    unique: true
  })
  email: string;

  @Column()
  password: string;
}