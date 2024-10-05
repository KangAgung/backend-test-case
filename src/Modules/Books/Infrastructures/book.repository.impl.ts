import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Book } from '../Domain/book.entity';
import { BookRepository } from '../Domain/book.repository';
import { BookEntity } from './book.entity';

@Injectable()
export class BookRepositoryImpl implements BookRepository {
  constructor(
    @InjectRepository(BookEntity)
    private readonly repository: Repository<BookEntity>,
  ) {}

  async checkBooks(): Promise<BookEntity[]> {
    try {
      return await this.repository.find({
        where: {
          stock: MoreThan(0),
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByCode(code: string): Promise<Book | null> {
    try {
      const book = await this.repository.findOne({ where: { code } });
      if (!book) return null;
      return new Book(book.id, book.code, book.title, book.author, book.stock);
    } catch (error) {
      throw new Error(error);
    }
  }

  async save(book: Book): Promise<Book> {
    try {
      const bookOrm = new BookEntity();

      bookOrm.id = book.id;
      bookOrm.code = book.code;
      bookOrm.title = book.title;
      bookOrm.author = book.author;
      bookOrm.stock = book.stock;

      await this.repository.save(bookOrm);

      return book;
    } catch (error) {
      throw new Error(error);
    }
  }
}
