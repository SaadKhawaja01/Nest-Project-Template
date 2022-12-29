import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/app/user/user.entity";
/*NextEntityPath*/

export const TypeOrmModuleExtension = TypeOrmModule.forRootAsync({
  useFactory: async () => {
    return {
      type: "mysql",
      host: process.env.RDS_HOSTNAME || "localhost",
      port: +process.env.RDS_PORT || 3306,
      database: process.env.RDS_DB_NAME || "mailingsystem",
      username: process.env.RDS_USERNAME || "root",
      password: process.env.RDS_PASSWORD || "",
      entities: [User /*NextEntity*/],
      synchronize: true,
    };
  },
});
