import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @Column()
  is_goodSale: boolean;

  @Column()
  is_active: boolean;

  @Column({ type: "decimal" })
  price: number;

  @Column()
  cover_img: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Users, (user) => user.advertisements, {onDelete: "CASCADE"})
  user: Users;

  @OneToMany(
    () => Users_advertisements,
    (userAdvertisements) => userAdvertisements.advertisements, {onDelete: "CASCADE"}
  )
  userAdvertisements: Users_advertisements[];

  @OneToMany(() => Images, (images) => images.advertisement, { eager: true })
  images: Images[];
}
