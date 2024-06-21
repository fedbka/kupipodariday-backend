import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { WishesController } from './wishes.controller';
import { WishesService } from './wishes.service';

@Module({
  controllers: [WishesController],
  providers: [WishesService],
  imports: [TypeOrmModule.forFeature([Wish])]
})
export class WishesModule { }
