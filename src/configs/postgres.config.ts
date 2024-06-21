import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Offer } from 'src/offers/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';

export const getPostgresConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: configService.get('DBMS_POSTGRES_HOST'),
    port: configService.get('DBMS_POSTGRES_PORT'),
    username: configService.get('DBMS_POSTGRES_USER'),
    password: configService.get('DBMS_POSTGRES_PASSWORD'),
    database: configService.get('DBMS_POSTGRES_DBNAME'),
    synchronize: configService.get('DBMS_POSTGRES_SYNCHRONIZE'),
    entities: [User, Wish, Wishlist, Offer],
  };
};
