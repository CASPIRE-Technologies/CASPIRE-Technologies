import {
  Module,
  RequestMethod,
  type MiddlewareConsumer,
  type NestModule,
} from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service.js";
import { AuthController } from "./auth.controller.js";
import { JwtStrategy } from "./jwt.strategy.js";
import { AuthMiddleware } from "../../middlewares/auth.middleware.js";
import { PrismaModule } from "../../prisma/prisma.module.js";

@Module({
  imports: [PassportModule, JwtModule.register({}), PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: "v1/auth/login", method: RequestMethod.POST },
        { path: "v1/auth/register", method: RequestMethod.POST },
        { path: "v1/auth/refresh", method: RequestMethod.POST },
      )
      .forRoutes(AuthController);
  }
}
