import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl, Length } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Wish } from "src/wishes/entities/wish.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OFFERS_AMOUNT_DESCRIPTION, OFFERS_AMOUNT_EXAMPLE, OFFERS_HIDDEN_DESCRIPTION, OFFERS_HIDDEN_EXAMPLE } from "../constants/offers";

@Entity({ comment: 'Предложения скинуться на подарок', name: 'offers' })
export class Offer {

  @ManyToOne(() => User, (user) => user.offers, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  item: Wish;

  @ApiProperty({
    description: OFFERS_AMOUNT_DESCRIPTION,
    example: OFFERS_AMOUNT_EXAMPLE,
  })  
  @Column({
    comment: OFFERS_AMOUNT_DESCRIPTION,
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({
    description: OFFERS_HIDDEN_DESCRIPTION,
    example: OFFERS_HIDDEN_EXAMPLE,
  })   
  @Column({
    comment: OFFERS_HIDDEN_DESCRIPTION,
    type: 'boolean',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  hidden: boolean;

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
    type: 'timestamp with time zone',
  })
  updatedAt: Date;

}
