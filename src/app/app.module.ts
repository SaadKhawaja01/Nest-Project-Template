import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";

import { ConfigModule } from "@nestjs/config";
import { TypeOrmModuleExtension } from "src/core/config/database.config";
import { JwtGuard, JwtStrategy } from "src/core/guards/jwt.guard";
import { AppController } from "./app.controller";
import { UserModule } from "./user/users.module";
/*NextModulePath*/

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "5b7fa43d96dfcc",
          pass: "cbe6984a023b1b",
        },
      },
    }), //formailer
    TypeOrmModuleExtension,
    ConfigModule.forRoot(),
    UserModule,
    /*NextModule*/
  ],
  controllers: [AppController],
  providers: [JwtStrategy, JwtGuard],
})
export class AppModule {}
