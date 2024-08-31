import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/users/entities/user.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';
import { OffersService } from './offers.service';

@ApiTags('Offers')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) { }

  @Post()
  async create(
    @Req() { user }: { user: User },
    @Body() dto: CreateOfferDto) {
    return this.offersService.create(dto, user);
  }

  @Get()
  async findAll(): Promise<Offer[] | null> {
    return this.offersService.findMany({});
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<Offer | null> {
    return this.offersService.findOne({ where: { 'id': +id } });
  }

}
