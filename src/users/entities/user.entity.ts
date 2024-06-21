import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, IsUrl, Length } from "class-validator";
import { USER_DEFAULT_ABOUT_TEXT, USER_DEFAULT_AVATAR_LINK } from "src/constants/users";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({comment: 'Пользователи', name: 'users' })
export class User {

  @Column({
    comment: 'Имя пользователя',
    length: 64,
    unique: true,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 64)
  username: String;

  @Column({
    comment: 'Описание',
    default: USER_DEFAULT_ABOUT_TEXT,
    length: 200,
  })
  @IsString()
  @Length(0, 200)
  about: String;

  @Column({
    comment: 'Аватар (ссылка)',
    default: USER_DEFAULT_AVATAR_LINK,
  })
  @IsUrl()
  avatar: String;

  @Column({
    comment: 'Электронная почта',
    unique: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: String;

  @Column({ 
    comment: 'Пароль',
    select: false, })
  @IsNotEmpty()
  @IsString()
  @Length(2)
  @Exclude({})
  password: String;

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