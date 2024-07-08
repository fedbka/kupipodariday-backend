import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('me')
  async getMe(
    @Req() { user }: { user: User }
  ): Promise<User> {
    return user;
  }

  @Patch('me')
  async updateMe(
    @Req() { user }: { user: User },
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.updateOne(user, dto);
  }

  @Get('me/wishes')
  async getAuthUserWishes(
    @Req() { user }: { user: User },
  ) {
    return this.usersService.getWishesByUsername(user.username);
  }

  @Get(':username')
  async findByUsername(
    @Param('username') username: string,
  ): Promise<User | null> {
    return this.usersService.findByUsername(username);
  }

  @Get(':username/wishes')
  async getUserWishes(
    @Param('username') username: string,
  ) {
    return this.usersService.getWishesByUsername(username);
  }

  @Post('find')
  async findUsers(
    @Body('query') query: string,
  ): Promise<User[]> {
    return this.usersService.findMany(query);
  }

}
