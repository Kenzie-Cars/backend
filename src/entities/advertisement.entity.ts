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

  @Column({ length: 20 })
  fuel: string;

  @Column({ length: 20 })
  color: string;

  @Column({ type: "text", length: 20 })
  description: string;

  @Column({ length: 6 })
  km: number;

  @Column({ type: "decimal", length: 10 })
  FIPE_price: number;

  @Column({ type: "decimal", length: 10 })
  price: number;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @DeleteDateColumn({ type: "timestamp" })
  updated_at: Date;

  @OneToMany(() => Users_advertisements, (userAdvertisements) => userAdvertisements.advertisements)
  userAdvertisements: Users_advertisements[]

  @OneToMany(() => Images, (images) => images.images)
  images: Images[]

}
