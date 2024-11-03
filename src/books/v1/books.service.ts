import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Books } from './books.entity';
import { Repository } from 'typeorm';
import { BookDto, GetBookDto } from './books.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Books)
    private readonly booksRepository: Repository<Books>,
  ) {}

  public async getAllBooks(): Promise<Array<GetBookDto>> {
    const books = await this.booksRepository.find();
    return books;
  }

  public async getBookById(id: number): Promise<GetBookDto> {
    const book = await this.booksRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  public async createBook(bookDto: BookDto): Promise<GetBookDto> {
    try {
      const newBook = await this.booksRepository.save(bookDto);
      return newBook;
    } catch (error) {
      throw new BadRequestException(`Failed to create book. ${error.message}`);
    }
  }

  public async updateBook(id: number, bookDto: BookDto): Promise<GetBookDto> {
    const existingBook = await this.booksRepository.findOneBy({ id });
    if (!existingBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    await this.booksRepository.update(id, bookDto);
    return { ...existingBook, ...bookDto };
  }

  public async deleteBook(id: number): Promise<void> {
    const deleteResult = await this.booksRepository.delete(id);
    if (!deleteResult.affected) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }
}
