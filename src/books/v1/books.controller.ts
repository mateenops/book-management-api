import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { BookDto, GetBookDto } from './books.dto';
import { BooksService } from './books.service';

@ApiTags('books')
@Controller('api/v1/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all books',
    type: Array<GetBookDto>,
  })
  public async getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID of the book to retrieve' })
  @ApiResponse({ status: 200, description: 'Book details', type: GetBookDto })
  @ApiResponse({ status: 404, description: 'Book not found' })
  public async getBookById(@Param('id') id: number) {
    const book = this.booksService.getBookById(id);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  @Post()
  @ApiBody({ type: BookDto })
  @ApiResponse({ status: 201, description: 'Book created successfully' })
  public async createBook(@Body() bookDto: BookDto) {
    return this.booksService.createBook(bookDto);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'ID of the book to update' })
  @ApiResponse({ status: 200, description: 'Book updated successfully' })
  public async updateBook(@Param('id') id: string, @Body() bookDto: BookDto) {
    return this.booksService.updateBook(id, bookDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID of the book to delete' })
  @ApiResponse({ status: 204, description: 'Book deleted successfully' })
  public async deleteBook(@Param('id') id: number) {
    return this.booksService.deleteBook(id);
  }
}
