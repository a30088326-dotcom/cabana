import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!this.auth.verify(request.cookies?.elara_session))
      throw new UnauthorizedException("Please sign in");
    if (
      !["GET", "HEAD", "OPTIONS"].includes(request.method) &&
      request.headers["x-requested-with"] !== "elara-web"
    )
      throw new ForbiddenException("Missing request verification");
    return true;
  }
}
