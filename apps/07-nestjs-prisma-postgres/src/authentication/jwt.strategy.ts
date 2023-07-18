import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { UsersService } from "../users/users.service";
import TokenPayload from "./tokenPayload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          console.log(request?.cookies?.Authentication);
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: configService.get("JWT_SECRET"),
    });
  }

  async validate(payload: TokenPayload) {
    console.log(payload);
    return this.userService.getById(payload.userId);
  }
}
