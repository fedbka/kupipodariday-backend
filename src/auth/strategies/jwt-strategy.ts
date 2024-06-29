import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { AUTH_ERROR_MESSAGE_USER_NOT_FOUND } from '../constants/auth';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpirations: false,
      secretOrKey: configService.get<string>('APP_JWT_SECRET'),
    })
  }

  async validate(jwtPayload: { sub: number }) {
    const user = this.userService.findById(jwtPayload.sub);
    
    if (!user) {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGE_USER_NOT_FOUND);
    }
 
    return user;
  }
}
