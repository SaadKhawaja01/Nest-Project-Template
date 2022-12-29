import { Controller, Post, Body, Get } from "@nestjs/common";
import { IAuthUserResponse } from "./user.dto";
import { UsersPolicy } from "./users.policy";
import { UsersService } from "./users.service";
import { ApiTags } from "@nestjs/swagger";
import { UserLogin, UserRegister } from "./users.model";
import { MailingService } from "./mailing.service";
import { VerifyEmail } from "./forgetpasswords.model";
import { ForgetPassword, ResetPassword } from "./forgetpasswords.model";

@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersPolicy: UsersPolicy,
    private readonly mailingService: MailingService
  ) {}

  @Post("register")
  async register(@Body() model: UserRegister): Promise<IAuthUserResponse> {
    return this.usersService.register(model);
  }

  @Post("login")
  async login(@Body() model: UserLogin): Promise<IAuthUserResponse> {
    return this.usersService.login(model);
  }

  @Post("verifyemail")
  async Verifyemail(@Body() model: VerifyEmail): Promise<string> {
    return this.usersService.Verifyemail(model);
  }
  @Post("forgetpassword")
  async forgetpassword(@Body() model: ForgetPassword): Promise<string> {
    return this.usersService.ForgetPassword(model);
  }

  @Post("resetpassword")
  async resetpassword(@Body() model: ResetPassword): Promise<string> {
    return this.usersService.ResetPassword(model);
  }
}
