import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Advertisements } from "./advertisement.entity";

@Entity("images")
export class Images {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({nullable: true})
  image1: string;
  
  @Column({nullable: true})
  image2: string;
  
  @Column({nullable: true})
  image3: string;
  
  @Column({nullable: true})
  image4: string;
  
  @Column({nullable: true})
  image5: string;
  
  @Column({nullable: true})
  image6: string;

  @ManyToOne(() => Advertisements, (advertisement) => advertisement.images, { onDelete: "CASCADE" })
  advertisement: Advertisements;
}
