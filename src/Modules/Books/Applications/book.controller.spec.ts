import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { Book } from '../domain/book.entity';
import { BorrowBookUseCase } from './useCases/borrowBookUseCase';
import { ReturnBookUseCase } from './useCases/returnBookUseCase';
import { CheckBookUseCase } from './useCases/checkBookUseCase';
import { BooksResponse, ReturnBookDto } from './dto/book.dto';

describe('BookController', () => {
  let controller: BookController;
  let borrowBookUseCase: BorrowBookUseCase;
  let returnBookUseCase: ReturnBookUseCase;
  let checkBookUseCase: CheckBookUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BorrowBookUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: ReturnBookUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: CheckBookUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    borrowBookUseCase = module.get<BorrowBookUseCase>(BorrowBookUseCase);
    returnBookUseCase = module.get<ReturnBookUseCase>(ReturnBookUseCase);
    checkBookUseCase = module.get<CheckBookUseCase>(CheckBookUseCase);
  });

  it('should borrow a book successfully', async () => {
    const bookCode = 'HP-01';
    const memberCode = 'MM-01';
    const expectedBook: Book = {
      id: 1,
      code: 'HP-01',
      title: 'Harry Potter',
      author: 'J. K. Rowling',
      stock: 1,

      isAvailable: jest.fn(),
      borrow: jest.fn(),
      returnBook: jest.fn(),
    };

    jest.spyOn(borrowBookUseCase, 'execute').mockResolvedValue(expectedBook);

    const result = await controller.borrowBook({ bookCode, memberCode });

    expect(result).toEqual({
      message: 'Success borrow a book',
      data: expectedBook,
    });
    expect(borrowBookUseCase.execute).toHaveBeenCalledWith(
      bookCode,
      memberCode,
    );
    expect(borrowBookUseCase.execute).toHaveBeenCalledTimes(1);
  });

  it('should return a book successfully', async () => {
    const returnBook: ReturnBookDto = {
      bookCode: '123',
      memberCode: '456',
      borrowedDate: new Date().toISOString(),
    };

    jest.spyOn(returnBookUseCase, 'execute').mockResolvedValue(undefined);

    const result = await controller.returnBook(returnBook);

    expect(result).toEqual({
      message: 'Success return a book',
    });
    expect(returnBookUseCase.execute).toHaveBeenCalledWith(
      returnBook.bookCode,
      returnBook.memberCode,
      new Date(returnBook.borrowedDate),
    );
    expect(returnBookUseCase.execute).toHaveBeenCalledTimes(1);
  });

  it('should get available books', async () => {
    const expectedBooks: BooksResponse = {
      message: 'List available books',
      data: [
        {
          id: 1,
          code: 'HP-01',
          title: 'Harry Potter',
          author: 'J. K. Rowling',
          stock: 1,
        },
        {
          id: 1,
          code: 'LP-01',
          title: 'Laskar Pelangi',
          author: 'Andrea Hirata',
          stock: 1,
        },
      ],
    };

    jest.spyOn(checkBookUseCase, 'execute').mockResolvedValue(expectedBooks);

    const result = await controller.getBooks();

    expect(result).toEqual(expectedBooks);
    expect(checkBookUseCase.execute).toHaveBeenCalledTimes(1);
  });
});
