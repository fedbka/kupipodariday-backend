import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { HashService } from 'src/hash/hash.service';
import { FindOneOptions, Like, Repository } from 'typeorm';
import { USER_ERROR_MESSAGE_ALREADY_EXISTS, USER_ERROR_MESSAGE_NOT_FOUND } from './constants/users';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Wish } from 'src/wishes/entities/wish.entity';

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

  async updateOne(user: User, dto: UpdateUserDto) {

    if (dto.email && dto.email != user.email) {
      const userWithSameEmail = await this.usersRepository.findOneBy({ email: dto.email });
      if (userWithSameEmail) {
        throw new ConflictException(USER_ERROR_MESSAGE_ALREADY_EXISTS);
      }
    }

    if (dto.username && dto.username != user.username) {
      const userWithSameUsername = await this.usersRepository.findOneBy({ username: dto.username });
      if (userWithSameUsername) {
        throw new ConflictException(USER_ERROR_MESSAGE_ALREADY_EXISTS);
      }
    }

    if (dto.password) {
      dto.password = await this.hashService.hashData(dto.password);
    }

    await this.usersRepository.update({ id: user.id }, dto);

    return await this.usersRepository.findOneBy({ id: user.id });
  }

  async findMany(query: string) {
    return await this.usersRepository.find({
      where: [
        { username: Like(`%${query}%`) },
        { email: Like(`%${query}%`) },
      ],
    })
  }

  async getWishesByUsername(
    username: string
  ): Promise<Wish[]>  {
    const user = await this.usersRepository.findOne({
      where: { username },
      relations: {
        wishes: {
          owner: true,
          offers: true,
        },
      }
    });
    
    if (!user) {
      throw new NotFoundException(USER_ERROR_MESSAGE_NOT_FOUND);
    }

    return user.wishes;
  }

}
