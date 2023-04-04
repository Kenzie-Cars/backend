import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, DeleteDateColumn} from "typeorm";
import { Users } from "./user.entity";
import { Advertisements } from "./advertisement.entity";

@Entity("users_advertisements")
export class Users_advertisements {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;
  
    @DeleteDateColumn({ type: "timestamp" })
    updated_at: Date;

    @ManyToOne(() => Users, (user) => user.userAdvertisements)
    user: Users;

    @ManyToOne(() => Advertisements, (advertisements) => advertisements.userAdvertisements)
    advertisements: Advertisements;
}