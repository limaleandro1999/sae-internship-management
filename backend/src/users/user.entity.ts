import { Column } from "typeorm";

export abstract class User {
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
}