import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users_advertisements } from "./users_advertisements.entity";
import { Images } from "./images";

@Entity("advertisements")
export class Advertisements {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  brand: string;

  @Column({ length: 50 })
  model: string;

  @Column({ length: 50 })
  year: string;

  @Column({ length: 20 })
  fuel: string;

  @Column({ length: 20 })
  color: string;

  @Column({ length: 500 })
  description: string;

  @Column()
  km: number;

  @Column({ type: "decimal" })
  FIPE_price: number;

  @Column({ type: "decimal" })
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  updated_at: Date;

  // @OneToMany(() => Users_advertisements, (userAdvertisements) => userAdvertisements.advertisements)
  // userAdvertisements: Users_advertisements[]

  @OneToMany(() => Images, (images) => images.advertisement, { eager: true })
  images: Images[]
}
