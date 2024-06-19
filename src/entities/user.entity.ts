import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";
import { IsString, Length, IsUrl, IsDate, IsEmail, isNotEmpty, IsNotEmpty } from "class-validator";
import { USER_DEFAULT_ABOUT_TEXT, USER_DEFAULT_AVATAR_LINK } from "src/constants/users";
import { DBMS_STRING_TYPE } from "src/constants/dbms";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

@Entity()
export class User {

  @ApiProperty({
    description: 'Уникальный идентификатор'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Дата создания'
  })
  @CreateDateColumn({ type: 'timestamp with time zone' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Дата обновления'
  })
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  @IsDate()
  updatedAt: Date;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Жак Ив Кусто',
  })
  @Column({
    type: DBMS_STRING_TYPE,
    length: 64,
    unique: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 64)
  username: String;

  @ApiProperty({
    description: 'Описание пользователя',
    example: USER_DEFAULT_ABOUT_TEXT,
  })
  @Column({
    type: DBMS_STRING_TYPE,
    default: USER_DEFAULT_ABOUT_TEXT,
    length: 200
  })
  @IsString()
  @Length(1, 200)
  about: String;

  @ApiProperty({
    description: 'Ссылка на аватар',
    example: USER_DEFAULT_AVATAR_LINK,
  })
  @Column({
    type: DBMS_STRING_TYPE,
    default: USER_DEFAULT_AVATAR_LINK,
  })
  @IsUrl()
  avatar: String;

  @ApiProperty({
    description: 'Адрес электронной почты',
    example: 'mail@example.com',
  })
  @Column({
    type: DBMS_STRING_TYPE,
    unique: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsEmail()
  email: String;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: ''
  })
  @Column({
    type: DBMS_STRING_TYPE,
    select: false,
  })
  @IsString()
  @Length(2)
  @Exclude({})
  password: String;
}