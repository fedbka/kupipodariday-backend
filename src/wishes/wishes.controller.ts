import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/users/entities/user.entity';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { WishesService } from './wishes.service';

@ApiTags('Wishes')
@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(
    @Req() { user }: { user: User },
    @Body() dto: CreateWishDto,
  ): Promise<Wish> {
    return this.wishesService.create(user, dto);
  }

  @Get('last')
  getLastWishes(): Promise<Wish[]> {
    return this.wishesService.findMany({
      order: { createdAt: 'DESC' },
      take: 40,
      relations: ['owner', 'offers'],
    });
  }

  @Get('top')
  getTopWishes(): Promise<Wish[]> {
    return this.wishesService.findMany({
      order: { copied: 'DESC' },
      take: 20,
      relations: ['owner', 'offers'],
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  getWish(
    @Param('id') id: number,
  ): Promise<Wish | null> {
    return this.wishesService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  updateWish(
    @Req() { user }: { user: User },
    @Param('id') id: number,
    @Body() dto: UpdateWishDto,
  ) {
    return this.wishesService.updateOne(id, dto, user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  removeWish(
    @Req() { user }: { user: User },
    @Param('id') id: number,
  ) {
    return this.wishesService.removeOne(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':id/copy')
  async copyWish(
    @Req() { user }: { user: User },
    @Param('id') id: number,
  ) {
    return this.wishesService.copyWishById(id, user);
  }
}
