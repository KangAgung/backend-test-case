import { Book } from './book.entity';

export interface BookRepository {
  checkBooks(): Promise<any>;
  findByCode(code: string): Promise<Book | undefined>;
  save(book: Book): Promise<Book>;
}
