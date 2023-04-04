import { getRounds, hashSync } from "bcryptjs";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from "typeorm";
import { Users_advertisements } from "./users_advertisements.entity";

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  cpf: string;

  @Column()
  phone: string;

  @Column()
  birthDate: Date;

  @Column({ type: "text" })
  description: Text;

  @Column()
  is_adm: boolean;

  @Column()
  is_active: boolean;

  @Column()
  is_seller: boolean;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @DeleteDateColumn({ type: "timestamp" })
  updated_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncrypted = getRounds(this.password);
    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
  }

  @OneToMany(()=> Users_advertisements, (userAdvertisements)=> userAdvertisements.user)
  userAdvertisements: Users_advertisements[]

}
