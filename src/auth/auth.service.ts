import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AUTH_ERROR_MESSAGE_INCORRECT_PASSWORD, AUTH_ERROR_MESSAGE_USER_NOT_FOUND } from './constants/auth';
import { HashService } from 'src/hash/hash.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
  ) { }

  async authenticateUser(user: User) {
    const payload = { sub: user.id };

    const signedPayload = await this.jwtService.signAsync(payload);
    return { access_token: signedPayload}
  }

  async validateUserPassword(username: string, password: string): Promise<User> {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGE_USER_NOT_FOUND);
    }

    const storedPasswordHash = await this.usersService.getStoredPasswordHashByUsername(user.username);

    if (!storedPasswordHash) {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGE_USER_NOT_FOUND);
    }

    const passwordMatched = await this.hashService.verifyMatch(password, storedPasswordHash);

    if (!passwordMatched) {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGE_INCORRECT_PASSWORD);
    }

    return user;

  }

}
