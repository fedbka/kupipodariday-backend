import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl, Length } from "class-validator";
import { Offer } from "src/offers/entities/offer.entity";
import { User } from "src/users/entities/user.entity";
import { Wishlist } from "src/wishlists/entities/wishlist.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ comment: 'Подарки', name: 'wishes' })
export class Wish {

  @Column({
    comment: 'Название',
    length: 250,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 250)
  name: string;

  @Column({
    comment: 'Где продаётся (ссылка)',
  })
  @IsNotEmpty()
  @IsUrl()
  link: string;

  @Column({
    comment: 'Изображение (ссылка)',
  })
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @Column({
    comment: 'Стоимость',
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @Column({
    comment: 'Собрано',
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: 0,
  })
  @IsNumber()
  @IsPositive()
  raised: number;

  @ManyToOne(() => User, (user) => user.wishes)
  @JoinColumn()
  owner: User;

  @Column({
    comment: 'Описание',
    length: 1024,
  })
  @IsString()
  @Length(1, 1024)
  description: string;

  @OneToMany(() => Offer, (offer) => offer.item, {
    onDelete: 'CASCADE',
  })
  offers: Offer[];

  @ManyToMany(() => Wishlist, (wishlist) => wishlist.items)
  wishlists: Wishlist[];

  @Column({
    comment: 'Счетик скопировавших себе',
    type: 'numeric',
    precision: 10,
    scale: 0,
    default: 0,
  })
  @IsNumber()
  @IsPositive()
  copied: number;

  @PrimaryGeneratedColumn({
    comment: 'Уникальный идентификатор'
  })
  id: number;

  @CreateDateColumn({
    comment: 'Дата создания',
    type: 'timestamp with time zone',
  })
  createdAt: Date;

  @UpdateDateColumn({
    comment: 'Дата обновления',
    type: 'timestamp with time zone'
  })
  updatedAt: Date;
}
