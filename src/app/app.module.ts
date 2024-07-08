import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersModule } from 'src/offers/offers.module';
import { WishlistsModule } from 'src/wishlists/wishlists.module';
import { AuthModule } from '../auth/auth.module';
import { postgresConfig } from '../configs/postgres.config';
import { HashModule } from '../hash/hash.module';
import { UsersModule } from '../users/users.module';
import { WishesModule } from '../wishes/wishes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: postgresConfig,
      inject: [ConfigService],
    }),
    UsersModule,
    WishesModule,
    OffersModule,
    WishlistsModule,
    AuthModule,
    HashModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
