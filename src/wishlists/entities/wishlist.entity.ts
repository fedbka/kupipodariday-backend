import { IsNotEmpty, IsString, IsUrl, Length, MaxLength } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Wish } from "src/wishes/entities/wish.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ comment: 'Списки подарков', name: 'wishlists' })
export class Wishlist {

  @Column({
    comment: 'Название',
    length: 250,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 250)
  name: String;

  @Column({
    comment: 'Описание',
    length: 1500,
    default: '',
  })
  @IsString()
  @MaxLength(1500)
  description: String;

  @Column({
    comment: 'Обложка (ссылка)',
  })
  @IsUrl()
  image: String;

  @ManyToOne(() => User, user => user.wishlists, {
    nullable: false,
  })
  @JoinColumn()
  owner: User;

  @ManyToMany(() => Wish, (wish) => wish.id)
  @JoinTable()
  items: Wish[];

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
