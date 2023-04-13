import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Advertisements } from "./advertisement.entity";

@Entity("images")
export class Images {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  url: string;

  @ManyToOne(() => Advertisements, (advertisement) => advertisement.images, { onDelete: "CASCADE" })
  advertisement: Advertisements;
}
