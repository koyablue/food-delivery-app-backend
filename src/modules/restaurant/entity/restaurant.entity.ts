import { validateOrReject } from "class-validator";
import { CurrentStatus } from "../../../shared/utils/enum";
import { BeforeInsert, BeforeUpdate, Column, Entity, Index, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { User } from "../../user/entity/user.entity";
import { type } from "os";

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  uuid: string;

  @Column({ type:  'varchar' })
  @Index({ unique: true })
  name: string;

  @Column({ type: 'text' })
  address: string;

  @OneToMany(
    type => User,
    user => user.restaurant,
    { eager: false }
  )
  user: User[];

  @Column({ nullable: true, type: 'text' })
  profile_img: string;

  @Column({ nullable: true, type: 'time' })
  opening_time: string;

  @Column({ nullable: true, type: 'time' })
  closing_time: string;

  @Column({
    type: 'enum',
    enum: CurrentStatus,
    default: CurrentStatus.INACTIVE
  })
  current_status: string;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
