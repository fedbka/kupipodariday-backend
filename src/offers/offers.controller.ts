import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/users/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Offer } from './entities/offer.entity';
@ApiTags('Offers')
@UseGuards(JwtAuthGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) { }
  
  @ApiBearerAuth()
  @Post()
  async create(
    @Req() { user }: { user: User },
    @Body() dto: CreateOfferDto) {
    return this.offersService.create(dto, user);
  }

  @ApiBearerAuth()
  @Get()
  async findAll(): Promise<Offer[] | null> {
    return this.offersService.findMany({});
  }

  @ApiBearerAuth()  
  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<Offer | null> {
    return this.offersService.findOne({ where: { 'id': +id } });
  }

}
