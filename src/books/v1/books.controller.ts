import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { BookDto, GetBookDto } from './books.dto';
import { BooksService } from './books.service';
import { ErrorDto } from './error.dto';

@ApiTags('books')
@Controller('api/v1/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all books',
    type: GetBookDto,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong, Failed to fetch books.',
    type: ErrorDto,
  })
  public async getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID of the book to retrieve' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Book details',
    type: GetBookDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Book with ID {id} not found',
    type: ErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong, Failed to fetch book.',
    type: ErrorDto,
  })
  public async getBookById(@Param('id') id: number) {
    return await this.booksService.getBookById(id);
  }

  @Post()
  @ApiBody({ type: BookDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Book created successfully',
    type: GetBookDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed to create book.',
    type: ErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong, Failed to create book.',
    type: ErrorDto,
  })
  public async createBook(@Body() bookDto: BookDto) {
    return await this.booksService.createBook(bookDto);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'ID of the book to update' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Book updated successfully',
    type: GetBookDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Book with ID ${id} not found',
    type: ErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong, Failed to update book',
    type: ErrorDto,
  })
  public async updateBook(@Param('id') id: number, @Body() bookDto: BookDto) {
    return await this.booksService.updateBook(id, bookDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID of the book to delete' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Book deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Book with ID ${id} not found',
    type: ErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong, Failed to delete book',
    type: ErrorDto,
  })
  public async deleteBook(@Param('id') id: number) {
    return await this.booksService.deleteBook(id);
  }
}
