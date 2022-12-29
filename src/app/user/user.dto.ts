import { IBaseDto } from '../../core/base/base.dto';

export interface IUserRegister {
  name: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserResponse extends IBaseDto {
  avatar: string;
  name: string;
  email: string;
  role: string;
}

export interface IUserDetailResponse {}

export interface IAuthUserResponse extends IUserResponse {
  token: string;
}
