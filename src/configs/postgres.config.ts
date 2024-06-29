import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Offer } from 'src/offers/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';

export const postgresConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DBMS_POSTGRES_HOST') || 'localhost',
  port: configService.get('DBMS_POSTGRES_PORT') || 5432,
  username: configService.get('DBMS_POSTGRES_USER') || 'student',
  password: configService.get('DBMS_POSTGRES_PASSWORD') || 'student',
  database: configService.get('DBMS_POSTGRES_DBNAME') || 'kupipodariday',
  synchronize: configService.get('DBMS_POSTGRES_SYNCHRONIZE') || true,
  entities: [User, Wish, Wishlist, Offer],
});
