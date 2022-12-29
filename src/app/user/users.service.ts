import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { UserLogin, UserRegister } from "./users.model";
// import { randomstring } from "randomstring";
import * as bcrypt from "bcrypt";
import { IRequestUser } from "src/core/interfaces/user-request.interface";
import { JwtService } from "@nestjs/jwt";
import { IAuthUserResponse } from "./user.dto";
import { MailingService } from "./mailing.service";
import { VerifyEmail } from "./forgetpasswords.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ForgetPassword, ResetPassword } from "./forgetpasswords.model";
@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    private mailingService: MailingService
  ) {}

  async register(model: UserRegister): Promise<IAuthUserResponse> {
    let user = await User.findOneBy({ email: model.email });

    if (user) {
      throw new HttpException(
        "Email Unavailable",
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    const salt = await bcrypt.genSalt(Number(process.env.BSALT_NUMBER || 10));
    const passwordHash = bcrypt.hashSync(model.password, salt);
    // OTP in Db
    const otp = Math.floor(Math.random() * 9000 + 1000).toString();
    const OTPsalt = await bcrypt.genSalt(
      Number(process.env.BSALT_NUMBER || 10)
    );
    const OTPHash = bcrypt.hashSync(otp.toString(), OTPsalt);

    user = new User();
    user.email = model.email;
    user.name = model.name;
    user.password = passwordHash;
    user.role = "admin";
    user.emailVerificationCode = OTPHash;
    user.Verified = false;

    await user.commit();

    const token = await this.signUser(user);
    const userResponse = await user.responseDto();

    await this.mailingService.email(model.email, otp);

    return {
      token,
      ...userResponse,
    };
  }

  async login(model: UserLogin): Promise<IAuthUserResponse> {
    const user = await User.findOneBy({ email: model.email });

    if (user && bcrypt.compareSync(model.password, user.password)) {
      const token = await this.signUser(user);
      const userResponse = await user.responseDto();

      return {
        token,
        ...userResponse,
      };
    }

    throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
  }

  private async signUser(user: User) {
    var randomString = require("random-string");
    var x = randomString({ length: 20 });

    const session = randomString({ length: 20 });
    const salt = await bcrypt.genSalt(Number(process.env.BSALT_NUMBER || 10));
    const sessionHash = bcrypt.hashSync(session, salt);

    user.tokenSafety = sessionHash;
    await user.commit();

    const payload: IRequestUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      session,
    };

    return this.jwtService.sign(payload);
  }

  async Verifyemail(model: VerifyEmail) {
    const { email, otp } = model;

    let user = await User.findOneBy({ email });

    if (!user) {
      throw new HttpException("Wrong Email", HttpStatus.UNPROCESSABLE_ENTITY);
    }

    if (user && bcrypt.compareSync(otp, user.emailVerificationCode)) {
      user.Verified = true;
      await user.commit();
      return "Your account has been verfied";
    } else {
      return "Wrong OTP";
    }
  }

  async ForgetPassword(model: ForgetPassword) {
    const email = model.email;
    let user = await User.findOneBy({ email });

    if (!user) {
      throw new HttpException(
        "email not found",
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
    const otp = Math.floor(Math.random() * 9000 + 1000).toString();
    await this.mailingService.email(email, otp);

    const OTPsalt = await bcrypt.genSalt(
      Number(process.env.BSALT_NUMBER || 10)
    );
    const OTPHash = bcrypt.hashSync(otp.toString(), OTPsalt);

    user.OTP = OTPHash;
    await user.commit();

    return "please check your email to reset your password";
  }

  async ResetPassword(model: ResetPassword) {
    const email = model.email;
    let user = await User.findOneBy({ email });

    if (!user) {
      throw new HttpException(
        "email not found",
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    if (user && bcrypt.compareSync(model.OTP, user.OTP)) {
      const salt = await bcrypt.genSalt(Number(process.env.BSALT_NUMBER || 10));
      const passwordHash = bcrypt.hashSync(model.password, salt);
      user.password = passwordHash;
      await user.commit();
      return "Your Password has been changed.";
    } else {
      return "Wrong OTP";
    }
  }
}
