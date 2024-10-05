import { IsString } from 'class-validator';
import { BookEntity as Book } from '../../Infrastructures/book.entity';

export class BorrowBookDto {
  @IsString()
  bookCode: string;

  @IsString()
  memberCode: string;
}

export class ReturnBookDto {
  @IsString()
  bookCode: string;

  @IsString()
  memberCode: string;

  @IsString()
  borrowedDate: string;
}

export class CreateBookDto {
  @IsString()
  code: string;

  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  stock: number;
}

export class BookResponse {
  message: string = 'success';
  data: Book;
}

export class BooksResponse {
  message: string = 'success';
  data: Book[];
}
