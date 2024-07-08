import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Wishlist } from './entities/wishlist.entity';
import { User } from 'src/users/entities/user.entity';
import { UpdateWishDto } from 'src/wishes/dto/update-wish.dto';

@ApiTags('Wishlistlists')
@UseGuards(JwtAuthGuard)
@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @ApiBearerAuth()
  @Post()
  async create(
    @Req() { user }: { user: User },
    @Body() dto: CreateWishlistDto
  ): Promise<Wishlist> {
    return this.wishlistsService.create(user, dto);
  }

  @Get()
  async findAll() {
    return this.wishlistsService.findMany({
      relations: ['owner', 'items']
    });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
  ) {
    return this.wishlistsService.findById(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  async updateOne(
    @Req() { user }: { user: User },
    @Param('id') id: number,
    @Body() dto: UpdateWishDto,   
  ) {
    return this.wishlistsService.updateOne(id, dto, user);
  }

  @ApiBearerAuth()
  @Delete(':id')
  async deleteOne(
    @Req() { user }: { user: User },
    @Param('id') id: number,
  ) {
    return this.wishlistsService.removeOne(id, user);
  }


}
