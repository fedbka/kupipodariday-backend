import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

export const getPostgresConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: configService.get('DBMS_POSTGRES_HOST'),
    port: configService.get('DBMS_POSTGRES_PORT'),
    username: configService.get('DBMS_POSTGRES_USER'),
    password: configService.get('DBMS_POSTGRES_PASSWORD'),
    database: configService.get('DBMS_POSTGRES_DBNAME'),
    synchronize: configService.get('DBMS_POSTGRES_SYNCHRONIZE'),
    entities: [User],
  };
};
