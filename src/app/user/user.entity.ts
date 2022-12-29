import { OrmEntity } from 'src/core/base/orm.entity';
import { Column, Entity } from 'typeorm';
import { IUserDetailResponse, IUserResponse } from './user.dto';

@Entity()
export class User extends OrmEntity<IUserResponse, IUserDetailResponse> {
  @Column({ default: 'http://www.gravatar.com/avatar/?d=identicon' })
  avatar: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  tokenSafety: string;

  @Column()
  emailVerificationCode: string;
  @Column()
  OTP: string;

  @Column({default:false})
  Verified: boolean;

  get isAdmin() {
    return this.role === 'admin';
  }

  async responseDto(): Promise<IUserResponse> {
    const dto: IUserResponse = {
      id: this.id,
      avatar: this.avatar,
      name: this.name,
      email: this.email,
      role: this.role,
      created: undefined,
      updated: undefined
    };
    return dto;
  }

  async detailResponseDto(): Promise<IUserDetailResponse> {
    throw new Error('Method not implemented.');
  }
}
