import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { HashService } from 'src/hash/hash.service';
import { Repository } from 'typeorm';
import { USER_ERROR_MESSAGE_ALREADY_EXISTS } from './constants/users';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly hashService: HashService,
  ) { }

  async create(dto: CreateUserDto) {

    const existingUser = await this.usersRepository.findOneBy([
      { username: dto.username },
      { email: dto.email },
    ]);

    if (existingUser) {
      throw new ConflictException(USER_ERROR_MESSAGE_ALREADY_EXISTS);
    }

    const passwordHash = await this.hashService.hashData(dto.password);

    return this.usersRepository.save({
      ...dto,
      password: passwordHash,
    });
  }

  async findById(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ username });
  }

  async getStoredPasswordHashByUsername(username: string): Promise<string | undefined> {
    const userData: User | null = await this.usersRepository
      .createQueryBuilder('users')
      .where({ username })
      .addSelect(["users.password"])
      .getOne();

    return userData?.password;
  }

}
