import { Body, Controller, Header, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiBody, ApiHeaders, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';


@ApiTags('Регистрация и Аутентификация пользователей')
@Controller('')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @ApiBody({
    description: 'Пара имя пользователя - пароль',

  })
  @Post('signin')
  @Header('Cache-Control', 'none')
  async signin(@Req() { user }: { user: User }): Promise<{ access_token: string; }> {
    return await this.authService.authenticateUser(user);
  }

  @Post('signup')
  @Header('Cache-Control', 'none')
  async singup(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    return this.authService.authenticateUser(user);
  }

}
