import { Injectable } from '@nestjs/common';
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
    return await this.booksRepository.find();
  }

  public async getBookById(id: number) {
    return await this.booksRepository.findOneBy({ id: id });
  }

  public async createBook(bookDto: BookDto): Promise<GetBookDto> {
    const bookItem = this.booksRepository.create(bookDto);
    return this.booksRepository.save(bookItem);
  }

  public async updateBook(id: string, bookDto: BookDto) {
    return await this.booksRepository.update(id, bookDto);
  }

  public async deleteBook(id: number): Promise<void> {
    await this.booksRepository.delete(id);
  }
}
