import { PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Wishlist } from '../entities/wishlist.entity';

export class CreateWishlistDto extends PickType(Wishlist, [
  'name',
  'image',
] as const) {
  @IsNotEmpty()
  itemsId: number[];
}
