import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import {
  BorrowBookDto,
  BookResponse,
  ReturnBookDto,
  BooksResponse,
} from './dto/book.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { BorrowBookUseCase } from './useCases/borrowBookUseCase';
import { ReturnBookUseCase } from './useCases/returnBookUseCase';
import { CheckBookUseCase } from './useCases/checkBookUseCase';

@Controller('books')
@ApiTags('Books')
export class BookController {
  constructor(
    private readonly borrowBookUseCase: BorrowBookUseCase,
    private readonly returnBookUseCase: ReturnBookUseCase,
    private readonly checkBookUseCase: CheckBookUseCase,
  ) {}

  @Post('borrow')
  @ApiOperation({
    summary: 'Borrow a book',
    description: 'Borrowing a book.',
  })
  @ApiCreatedResponse({
    type: BookResponse,
  })
  async borrowBook(
    @Body() borrowBookDto: BorrowBookDto,
  ): Promise<BookResponse> {
    try {
      const { bookCode, memberCode } = borrowBookDto;
      const book = await this.borrowBookUseCase.execute(bookCode, memberCode);

      return {
        message: 'Success borrow a book',
        data: book,
      };
    } catch (error) {
      console.error('Error has been occured:', error);
      throw new InternalServerErrorException({
        status: 500,
        message: 'internal server error',
      });
    }
  }

  @Post('return')
  @ApiOperation({
    summary: 'Return a book',
    description: 'Returning a book.',
  })
  @ApiCreatedResponse({
    description: 'The book has been returned',
    example: {
      message: 'Success return a book',
    },
  })
  async returnBook(@Body() returnBookDto: ReturnBookDto) {
    try {
      const { bookCode, memberCode, borrowedDate } = returnBookDto;
      const date = new Date(borrowedDate);
      await this.returnBookUseCase.execute(bookCode, memberCode, date);

      return {
        message: 'Success return a book',
      };
    } catch (error) {
      console.error('Error has been occured:', error);
      throw new InternalServerErrorException({
        status: 500,
        message: 'internal server error',
      });
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Check available books',
    description: 'List all of books that available to be borrowed.',
  })
  @ApiOkResponse({
    description: 'List of books',
    type: BooksResponse,
  })
  async getBooks(): Promise<BooksResponse> {
    try {
      return await this.checkBookUseCase.execute();
    } catch (error) {
      console.error('Error has been occured:', error);
      throw new InternalServerErrorException({
        status: 500,
        message: 'internal server error',
      });
    }
  }
}
