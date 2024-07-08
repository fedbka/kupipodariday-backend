import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_ERROR_MESSAGE_INCORRECT_ID, USER_ERROR_MESSAGE_NOT_FOUND } from './constants/users';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from './entities/user.entity';
import { PublicUserProfileDto } from './dto/user-profile.dto';
import { Wish } from 'src/wishes/entities/wish.entity';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiBearerAuth()
  @Get('me')
  async getMe(
    @Req() { user }: { user: User }
  ): Promise<User> {
    return user;
  }

  @ApiBearerAuth()
  @Patch('me')
  async updateMe(
    @Req() { user }: { user: User },
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.updateOne(user, dto);
  }

  @ApiBearerAuth()
  @Get('me/wishes')
  async getAuthUserWishes(
    @Req() { user }: { user: User },
  ) {
    return this.usersService.getWishesByUsername(user.username);
  }

  @ApiBearerAuth()
  @Get(':username')
  async findByUsername(
    @Param('username') username: string,
  ): Promise<User | null> {
    return this.usersService.findByUsername(username);
  }

  @ApiBearerAuth()
  @Get(':username/wishes')
  async getUserWishes(
    @Param('username') username: string,
  ) {
    return this.usersService.getWishesByUsername(username);
  }
  
  
  @ApiBearerAuth()
  @Post('find')
  async findUsers(
    @Body('query') query: string,
  ): Promise<User[]> {
    return this.usersService.findMany(query);
  }


  /*  
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
      return this.usersService.create(createUserDto);
    }
  
     @Get(':id')
    findOne(@Param('id') id: string) {
      const numberedId = Number(id);
      if (!numberedId) {
        throw new BadRequestException(USER_ERROR_MESSAGE_INCORRECT_ID);
      }
      return this.usersService.findById(numberedId);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.usersService.update(+id, updateUserDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.usersService.remove(+id);
    } */
}
