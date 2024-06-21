import { IsBoolean, IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl, Length } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Wish } from "src/wishes/entities/wish.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ comment: 'Предложения скинуться на подарок', name: 'offers' })
export class Offer {

  @ManyToOne(() => User, (user) => user.offers)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  @JoinColumn()
  item: Wish;

  @Column({
    comment: 'Сумма заявки',
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  @IsNumber()
  @IsPositive()
  amount: Number;

  @Column({
    comment: 'Признак скрытой заявки',
    type: 'boolean',
    default: false,
  })
  @IsBoolean()
  hidden: Boolean;

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
