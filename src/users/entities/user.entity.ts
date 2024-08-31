import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { Offer } from "src/offers/entities/offer.entity";
import { USER_ABOUT_DESCRIPTION, USER_ABOUT_EXAMPLE, USER_AVATAR_DESCRIPTION, USER_AVATAR_EXAMPLE, USER_CREATED_AT_DESCRIPTION, USER_EMAIL_DESCRIPTION, USER_EMAIL_EXAMPLE, USER_ID_DESCRIPTION, USER_OFFERS_DESCRIPTION, USER_PASSWORD_DESCRIPTION, USER_PASSWORD_EXAMPLE, USER_UPDATED_AT_DESCRIPTION, USER_USERNAME_DESCRIPTION, USER_USERNAME_EXAMPLE, USER_WISHES_DESCRIPTION, USER_WISHLISTS_DESCRIPTION } from "src/users/constants/users";
import { Wish } from "src/wishes/entities/wish.entity";
import { Wishlist } from "src/wishlists/entities/wishlist.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ comment: 'Пользователи', name: 'users' })
export class User {

  @ApiProperty({
    description: USER_USERNAME_DESCRIPTION,
    example: USER_USERNAME_EXAMPLE,
  })
  @Column({
    comment: USER_USERNAME_DESCRIPTION,
    length: 64,
    unique: true,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 64)
  username: string;

  @ApiProperty({
    description: USER_ABOUT_DESCRIPTION,
    example: USER_ABOUT_EXAMPLE,
  })
  @Column({
    comment: USER_ABOUT_DESCRIPTION,
    default: USER_ABOUT_EXAMPLE,
    length: 200,
  })
  @IsString()
  @Length(2, 200)
  about: string;

  @ApiProperty({
    description: USER_AVATAR_DESCRIPTION,
    example: USER_AVATAR_EXAMPLE,
  })
  @Column({
    comment: USER_AVATAR_DESCRIPTION,
    default: USER_AVATAR_EXAMPLE,
  })
  avatar: string;

  @ApiProperty({
    description: USER_EMAIL_DESCRIPTION,
    example: USER_EMAIL_EXAMPLE,
  })
  @Column({
    comment: USER_EMAIL_DESCRIPTION,
    unique: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: USER_PASSWORD_DESCRIPTION,
    example: USER_PASSWORD_EXAMPLE,
  })
  @Column({
    select: false,
    comment: USER_PASSWORD_DESCRIPTION,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: USER_WISHES_DESCRIPTION,
  })
  @OneToMany(() => Wish, wish => wish.owner)
  wishes: Wish[];

  @ApiProperty({
    description: USER_OFFERS_DESCRIPTION,
  })
  @OneToMany(() => Offer, offer => offer.user)
  offers: Offer[];

  @ApiProperty({
    description: USER_WISHLISTS_DESCRIPTION,
  })
  @OneToMany(() => Wishlist, wishlist => wishlist.owner)
  wishlists: Wishlist[];

  @ApiProperty({
    description: USER_ID_DESCRIPTION,
  })
  @PrimaryGeneratedColumn({
    comment: USER_ID_DESCRIPTION,
  })
  id: number;

  @ApiProperty({
    description: USER_CREATED_AT_DESCRIPTION,
  })
  @CreateDateColumn({
    comment: USER_CREATED_AT_DESCRIPTION,
    type: 'timestamp with time zone',
  })
  createdAt: Date;

  @ApiProperty({
    description: USER_UPDATED_AT_DESCRIPTION,
  })
  @UpdateDateColumn({
    comment: USER_UPDATED_AT_DESCRIPTION,
    type: 'timestamp with time zone'
  })
  updatedAt: Date;

}