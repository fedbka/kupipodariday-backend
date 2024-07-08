import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { User } from 'src/users/entities/user.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { WISH_ERROR_MESSAGE_FORBIDВEN, WISH_ERROR_MESSAGE_NOT_FOUND, WISH_ERROR_MESSAGE_FORBIDВEN_CHANGE_PRICE } from './constants/wishes';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
  ) { }

  async create(user: User, dto: CreateWishDto) {
    return await this.wishesRepository.save({
      ...dto,
      owner: user,
    });
  }

  async findMany(query: FindManyOptions<Wish>) {
    return await this.wishesRepository.find(query);
  }

  async findById(id: number): Promise<Wish | null> {
    return await this.wishesRepository.findOne({ where: { id }, relations: ['owner', 'offers'] });
  }

  async updateOne(id: number, dto: UpdateWishDto, user: User) {
    const wish = await this.findById(id);

    if (!wish) {
      throw new NotFoundException(WISH_ERROR_MESSAGE_NOT_FOUND);
    }

    if (wish.owner.id != user.id) {
      throw new ForbiddenException(WISH_ERROR_MESSAGE_FORBIDВEN);
    }

    if (dto.price != wish.price && wish.offers) {
      throw new ForbiddenException(WISH_ERROR_MESSAGE_FORBIDВEN_CHANGE_PRICE)
    }

    await this.wishesRepository.update({ id }, dto);

    const updatedWish = await this.findById(id);

    return updatedWish;

  }

  async removeOne(id: number, user: User) {
    const deletedWish = await this.findById(id);

    if (!deletedWish) {
      throw new NotFoundException(WISH_ERROR_MESSAGE_NOT_FOUND);
    }

    if (deletedWish.owner.id != user.id) {
      throw new ForbiddenException(WISH_ERROR_MESSAGE_FORBIDВEN);
    }

    await this.wishesRepository.delete(id);

    return deletedWish;

  }

  async copyWishById(id: number, user: User) {
    const sourceWish = await this.findById(id);

    if (!sourceWish) {
      throw new NotFoundException(WISH_ERROR_MESSAGE_NOT_FOUND);
    }

    const dto: CreateWishDto = {
      name: sourceWish.name,
      link: sourceWish.link,
      image: sourceWish.image,
      price: sourceWish.price,
      description: sourceWish.description,
    };

    const copiedWish = await this.create(user, dto);

    await this.wishesRepository.save({ ...sourceWish, copied: sourceWish.copied + 1 });

    return copiedWish;

  }

  async updateRaisedOne(id: number, raised: number) {
    const wish = await this.findById(id);

    if (!wish) {
      throw new NotFoundException(WISH_ERROR_MESSAGE_NOT_FOUND);
    }

    return await this.wishesRepository.update({ id }, { raised });
  }

}
