import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/users/entities/user.entity';
import { Wish } from './entities/wish.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Wishes')
@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) { }

  @UseGuards(JwtAuthGuard)  
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
  @Get(':id')
  getWish(
    @Param('id') id: number,
  ): Promise<Wish | null> {
    return this.wishesService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateWish(
    @Req() { user }: { user: User },
    @Param('id') id: number,
    @Body() dto: UpdateWishDto,   
  ) {
    return this.wishesService.updateOne(id, dto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  removeWish(
    @Req() { user }: { user: User },
    @Param('id') id: number,
  ) {
    return this.wishesService.removeOne(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/copy')
  async copyWish(
    @Req() { user }: { user: User },
    @Param('id') id: number, 
  ) {
    return this.wishesService.copyWishById(id, user);
  }

  /*
     @Get()
    findAll() {
      return this.wishesService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.wishesService.findOne(+id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateWishDto: UpdateWishDto) {
      return this.wishesService.update(+id, updateWishDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.wishesService.remove(+id);
    } */
}
