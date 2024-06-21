import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl, Length } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Wish } from "src/wishes/entities/wish.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn, JoinTable } from "typeorm";

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
  })
  @IsString()
  @Length(1, 1500)
  description: String;
  
  @Column({
    comment: 'Обложка (ссылка)',
  })
  @IsUrl()
  image: String;

  @ManyToOne(() => User, user => user.wishlists)
  @JoinColumn()
  owner: User;

  @ManyToMany(() => Wish)
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
