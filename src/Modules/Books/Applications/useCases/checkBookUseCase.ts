import { BookRepository } from '../../domain/book.repository';
import { BooksResponse } from '../dto/book.dto';
import { Inject } from '@nestjs/common';

export class CheckBookUseCase {
  constructor(
    @Inject('BookRepository')
    private readonly bookRepository: BookRepository,
  ) {}

  async execute(): Promise<BooksResponse> {
    try {
      const books = await this.bookRepository.checkBooks();

      return {
        message: 'List available books',
        data: books,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
