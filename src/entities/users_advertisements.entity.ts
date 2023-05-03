import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, DeleteDateColumn, Column} from "typeorm";
import { Advertisements } from "./advertisement.entity";
import { Users } from "./user.entity";

@Entity("users_advertisements")
export class Users_advertisements {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({length: 500, nullable: true})
    comment: string;
    
    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;
  
    @DeleteDateColumn({ type: "timestamp" })
    updated_at: Date;

    @ManyToOne(() => Users, (user) => user.userAdvertisements)
    user: Users;

    @ManyToOne(() => Advertisements, (advertisements) => advertisements.userAdvertisements)
    advertisements: Advertisements;
}