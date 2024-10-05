import { BookRepository } from '../../domain/book.repository';
import { MemberRepository } from '../../../members/domain/member.repository';
import { Inject } from '@nestjs/common';

export class ReturnBookUseCase {
  constructor(
    @Inject('BookRepository')
    private readonly bookRepository: BookRepository,
    @Inject('MemberRepository')
    private readonly memberRepository: MemberRepository,
  ) {}

  async execute(
    bookCode: string,
    memberCode: string,
    borrowedDate: Date,
  ): Promise<void> {
    try {
      const book = await this.bookRepository.findByCode(bookCode);
      const member = await this.memberRepository.findByCode(memberCode);

      if (!book || !member) {
        throw new Error('Book or Member not found');
      }

      member.returnBook(bookCode, borrowedDate);
      book.returnBook();

      await this.bookRepository.save(book);
      await this.memberRepository.save(member);
    } catch (error) {
      throw new Error(error);
    }
  }
}
