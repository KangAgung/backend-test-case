import { BookRepository } from '../../domain/book.repository';
import { MemberRepository } from '../../../members/domain/member.repository';
import { Book } from '../../domain/book.entity';
import { Inject } from '@nestjs/common';

export class BorrowBookUseCase {
  constructor(
    @Inject('BookRepository')
    private readonly bookRepository: BookRepository,
    @Inject('MemberRepository')
    private readonly memberRepository: MemberRepository,
  ) {}

  async execute(bookCode: string, memberCode: string): Promise<Book> {
    try {
      const book = await this.bookRepository.findByCode(bookCode);
      const member = await this.memberRepository.findByCode(memberCode);

      if (!book || !member) {
        throw new Error('Book or Member not found');
      }

      if (!member.canBorrow()) {
        throw new Error('Member cannot borrow more books.');
      }

      if (!book.isAvailable()) {
        throw new Error('Book is not available.');
      }

      book.borrow();
      member.borrowBook(book.code);

      await this.bookRepository.save(book);
      await this.memberRepository.save(member);

      return book;
    } catch (error) {
      throw new Error(error);
    }
  }
}
