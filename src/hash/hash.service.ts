import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class HashService {
  constructor(
    private readonly configService: ConfigService,
  ) { }

  async hashData(data: string): Promise<string> {
    const saltOrRounds = +this.configService.get('APP_SALT_OR_ROUNDS') || 10;
    const salt = await genSalt(saltOrRounds);
    return await hash(data, salt);
  }

  async verifyMatch(data: string, hash: string): Promise<boolean> {
    return await compare(data, hash);
  }
}
