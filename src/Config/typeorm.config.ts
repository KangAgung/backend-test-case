import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BookEntity } from 'src/Modules/Books/Infrastructures/book.entity';
import { MemberEntity } from 'src/Modules/Members/Infrastructures/member.entity';

export const defaultConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  return {
    host: configService.get<string>('TYPEORM_HOST'),
    port: configService.get<number>('TYPEORM_PORT'),
    database: configService.get<string>('TYPEORM_DATABASE'),
    schema: configService.get<string>('TYPEORM_SCHEMA'),
    password: configService.get<string>('TYPEORM_PASSWORD'),
    username: configService.get<string>('TYPEORM_USERNAME'),
    type: 'postgres',
    entities: [BookEntity, MemberEntity],
    logging: ['error', 'warn'],
  };
};
