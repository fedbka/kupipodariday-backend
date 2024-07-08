import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { User } from 'src/users/entities/user.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from 'src/wishes/entities/wish.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { WISHLISTS_ERROR_MESSAGE_NOT_FOUND, WISHLISTS_ERROR_MESSAGE_FORBIDВEN } from './constants/wishlists';

@Injectable()
export class WishlistsService {

  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistsRepository: Repository<Wishlist>,
    private readonly wishesService: WishesService,
  ) { }

  async create(owner: User, dto: CreateWishlistDto) {

    const wishes: Wish[] = [];

    for (let id of dto.itemsId) {
      let wish = await this.wishesService.findById(id);
      if (!wish) {
        throw new BadRequestException('Переданы некорректные идентификаторы подарков');
      }
      wishes.push(wish);
    }

    if (wishes.length == 0) {
      throw new BadRequestException('Переданы некорректные идентификаторы подарков');
    }

    return this.wishlistsRepository.save({
      ...dto,
      wishes,
      owner,
    });
  }

  async findMany(query: FindManyOptions<Wishlist>) {
    return this.wishlistsRepository.find(query);
  }

  async findById(id: number): Promise<Wishlist | null> {
    const wishlist = this.wishlistsRepository.findOne({ where: { id }, relations: ['owner', 'items'], });

    if (!wishlist) {
      throw new NotFoundException('Список пожеланий с укзанным идентификатором не найден');
    }

    return wishlist;
  }

  async updateOne(id: number, dto: UpdateWishlistDto, user: User) {
    const wishlist = await this.findById(id);

    if (!wishlist) {
      throw new NotFoundException(WISHLISTS_ERROR_MESSAGE_NOT_FOUND);
    }

    if (wishlist.owner.id != user.id) {
      throw new ForbiddenException(WISHLISTS_ERROR_MESSAGE_FORBIDВEN);
    }

    await this.wishlistsRepository.update({ id }, dto);

    const updatedWish = await this.findById(id);

    return updatedWish;

  }

  async removeOne(id: number, user: User) {
    const deletedWishlist = await this.findById(id);

    if (!deletedWishlist) {
      throw new NotFoundException(WISHLISTS_ERROR_MESSAGE_NOT_FOUND);
    }

    if (deletedWishlist.owner.id != user.id) {
      throw new ForbiddenException(WISHLISTS_ERROR_MESSAGE_FORBIDВEN);
    }

    await this.wishlistsRepository.delete(id);

    return deletedWishlist;

  }  

}
