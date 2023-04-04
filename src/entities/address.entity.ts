import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("address")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 8 })
  cep: string;

  @Column({ length: 2 })
  state: string;

  @Column({ length: 200 })
  city: string;

  @Column({ length: 200 })
  street: string;

  @Column({ length: 10 })
  number: string;

  @Column({ length: 10 })
  complement: string;
}
