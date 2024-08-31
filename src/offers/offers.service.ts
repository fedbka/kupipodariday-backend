import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { OFFERS_ERROR_MESSAGE_NOT_FOUND, OFFERS_ERROR_MESSAGE_OVERRAISED, OFFERS_ERROR_MESSAGE_RAISEENDED, OFFERS_ERROR_MESSAGE_SELF_OFFER, OFFERS_ERROR_MESSAGE_WISH_NOT_FOUND } from './constants/offers';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
    private readonly wishesService: WishesService,

  ) { }

  async create(dto: CreateOfferDto, user: User): Promise<Offer> {
    const wish = await this.wishesService.findById(dto.itemId);

    if (!wish) {
      throw new NotFoundException(OFFERS_ERROR_MESSAGE_WISH_NOT_FOUND);
    }

    if (wish.price === wish.raised) {
      throw new ForbiddenException(OFFERS_ERROR_MESSAGE_RAISEENDED);
    }

    if (wish.owner.id === user.id) {
      throw new ForbiddenException(OFFERS_ERROR_MESSAGE_SELF_OFFER);
    }

    if (wish.price < dto.amount || (wish.price - wish.raised) < dto.amount) {
      throw new ForbiddenException(OFFERS_ERROR_MESSAGE_OVERRAISED);
    }

    if (wish.price < dto.amount || (wish.price - wish.raised) < dto.amount) {
      throw new ForbiddenException(OFFERS_ERROR_MESSAGE_OVERRAISED);
    }

    console.log({
      raised: +wish.raised,
      amount: dto.amount,
      summ: +wish.raised + dto.amount
    })
    await this.wishesService.updateRaisedOne(wish.id, +wish.raised + dto.amount);

    return this.offersRepository.save({
      ...dto,
      user: user,
      item: wish,
    });
  }

  async findMany(query: FindManyOptions<Offer>) {
    return this.offersRepository.find(query);
  }

  async findOne(query: FindOneOptions<Offer>) {
    const offer = await this.offersRepository.findOne(query);

    if (!offer) {
      throw new NotFoundException(OFFERS_ERROR_MESSAGE_NOT_FOUND);
    }

    return offer;

  }

}
