import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization;
    if (!token) {
      console.log('헤드가 비어있습니다.');
      throw new UnauthorizedException();
    }
    const secretA = '0000';
    const secretR = '1234';
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: secretA,
      });
      req['user'] = payload;
    } catch (e) {
      if (e.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('access 아닌데?');
      }
      console.log(e);
      throw new UnauthorizedException();
      return req['user'];
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: secretR,
      });
      req['user'] = payload;
    } catch (e) {
      if (e.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('refresh 아닌데?');
      }
      console.log(e);
      throw new UnauthorizedException();
    }
    return true;
  }
}
