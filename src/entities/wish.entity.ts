import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";
import { IsString, Length, IsUrl, IsDate, IsEmail, IsNotEmpty } from "class-validator";
import { DBMS_STRING_TYPE } from "src/constants/dbms";

@Entity()
export class Wish {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  @IsDate()
  updatedAt: Date;

  @Column({
    type: DBMS_STRING_TYPE,
    length: 250,
    unique: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 250)
  name: String;

  @Column({ 
    type: DBMS_STRING_TYPE,
  })
  @IsUrl()
  link: String;

  @Column({ 
    type: DBMS_STRING_TYPE,
  })
  @IsUrl()
  imahe: String;


  @Column({ 
    type: DBMS_STRING_TYPE,
  })
  @IsUrl()
  avatar: String;

  @Column({ 
    type: DBMS_STRING_TYPE,
    unique: true, 
  })
  @IsEmail()
  email: String;

  @Column()
  @IsString()
  password: String;
  

}