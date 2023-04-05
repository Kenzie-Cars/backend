import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Advertisements } from "./advertisement.entity";

@Entity("images")
export class Images {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  url: string;

  @Column()
  title: string;

  @ManyToOne(() => Advertisements, (advertisement) => advertisement.images)
  images: Images;
}
