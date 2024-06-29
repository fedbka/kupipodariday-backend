import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_ERROR_MESSAGE_INCORRECT_ID, USER_ERROR_MESSAGE_NOT_FOUND } from './constants/users';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from './entities/user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('me')
  async getMe(@Req() { user }: { user: User }): Promise<User> {
    return user;
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
