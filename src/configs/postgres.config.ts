import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Offer } from 'src/offers/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';

export const postgresConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST') || 'localhost',
  port: configService.get('POSTGRES_PORT') || 5432,
  username: configService.get('POSTGRES_USER') || 'student',
  password: configService.get('POSTGRES_PASSWORD') || 'student',
  database: configService.get('POSTGRES_DB') || 'kupipodariday',
  synchronize: configService.get('POSTGRES_SYNCHRONIZE') || true,
  entities: [User, Wish, Wishlist, Offer],
});
