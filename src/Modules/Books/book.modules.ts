import { Module } from '@nestjs/common';
import { BookController } from './Applications/book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowBookUseCase } from './Applications/useCases/borrowBookUseCase';
import { ReturnBookUseCase } from './Applications/useCases/returnBookUseCase';
import { BookRepositoryImpl } from './Infrastructures/book.repository.impl';
import { BookEntity } from './Infrastructures/book.entity';
import { CheckBookUseCase } from './Applications/useCases/checkBookUseCase';
import { MemberRepositoryImpl } from '../Members/Infrastructures/member.repository.impl';
import { MemberEntity } from '../Members/Infrastructures/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, MemberEntity])],
  controllers: [BookController],
  providers: [
    BookRepositoryImpl,
    BorrowBookUseCase,
    ReturnBookUseCase,
    CheckBookUseCase,
    {
      provide: 'BookRepository',
      useClass: BookRepositoryImpl,
    },
    {
      provide: 'MemberRepository',
      useClass: MemberRepositoryImpl,
    },
  ],
})
export class BookModule {}
