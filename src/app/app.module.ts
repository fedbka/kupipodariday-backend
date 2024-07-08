import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { postgresConfig } from '../configs/postgres.config';
import { UsersModule } from '../users/users.module';
import { HashModule } from '../hash/hash.module';
import { WishesModule } from '../wishes/wishes.module';
import { WishlistsModule } from 'src/wishlists/wishlists.module';
import { OffersModule } from 'src/offers/offers.module';

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
