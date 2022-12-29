import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Iforgetpassword } from './forgetpassword.dto';


export class ForgetPassword implements Iforgetpassword {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class ResetPassword implements Iforgetpassword {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  OTP: string;

  @ApiProperty()
  @IsNotEmpty()
 password: string;
}


export class VerifyEmail {
  @ApiProperty()
  @IsNotEmpty()
  otp: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}