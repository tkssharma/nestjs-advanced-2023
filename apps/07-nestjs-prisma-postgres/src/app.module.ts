import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "@hapi/joi";
import { AuthenticationModule } from "./authentication/authentication.module";

//  ConfigModule.forRoot() // .env ==> process.env
@Module({
  imports: [
    AuthenticationModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
