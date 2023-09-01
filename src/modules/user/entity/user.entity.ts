import { BeforeInsert, BeforeUpdate, Column, Entity, Index, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, validateOrReject } from "class-validator";
import { hashPassword, isPasswordMatch } from "../../../shared/utils/password.utils";
import { CurrentStatus, UserRole, UserType } from "../../../shared/utils/enum";
import { UserInfo } from "./user-info.entity";
import { Restaurant } from "../../restaurant/entity/restaurant.entity";
import { Exclude, classToPlain } from "class-transformer";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Exclude({ toPlainOnly: true })
  id: number;

  @Column({ nullable: false, type: 'varchar' })
  uuid: string;

  @Column({ nullable: false, type: 'varchar' })
  @Index({ unique: true })
  @IsEmail()
  email: string;

  @Column({ nullable: false, type: 'varchar' })
  @Exclude({ toPlainOnly: true })
  password: string;

  @ManyToOne(
    type => Restaurant,
    restaurant => restaurant.user,
    { eager: false }
  )
  restaurant: Restaurant;

  @OneToOne(
    type => UserInfo,
    { eager: true }
  )
  @JoinColumn()
  user_info: UserInfo;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.VISITOR
  })
  user_type: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.NONE
  })
  role: string;

  @Column({
    type: 'enum',
    enum: CurrentStatus,
    default: CurrentStatus.ACTIVE
  })
  current_status: string;

  toJSON() {
    return classToPlain(this);
  }

  async doPasswordHashing(password: string): Promise<string> {
    return await hashPassword(password);
  }

  async validatePassword(password: string, hashPassword: string): Promise<boolean> {
    return await isPasswordMatch(hashPassword, password);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}