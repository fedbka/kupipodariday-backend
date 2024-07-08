import { PartialType } from '@nestjs/swagger';
import { Wishlist } from '../entities/wishlist.entity';

export class UpdateWishlistDto extends PartialType(Wishlist) {}
