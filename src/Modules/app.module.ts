import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { defaultConfig } from 'src/Config/typeorm.config';
import { BookModule } from './Books/book.modules';
import { MemberModule } from './Members/member.modules';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return defaultConfig(config);
      },
    }),
    BookModule,
    MemberModule,
  ],
})
export class AppModule {}
