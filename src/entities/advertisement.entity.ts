import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users_advertisements } from "./users_advertisements.entity";
import { Images } from "./images";
import { Users } from "./user.entity";

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

  @Column()
  cover_img: string;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  updated_at: Date;

  @ManyToOne(() => Users, (user) => user.userAdvertisements)
  user: Users;

  @OneToMany(
    () => Users_advertisements,
    (userAdvertisements) => userAdvertisements.advertisements
  )
  userAdvertisements: Users_advertisements[];

  @OneToMany(() => Images, (images) => images.advertisement, { eager: true })
  images: Images[];
}
