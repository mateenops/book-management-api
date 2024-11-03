import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { GetBookDto, BookDto } from './books.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  const mockBook: GetBookDto = {
    id: 1,
    title: 'Test Book',
    author: 'Test Author',
    isbn: '123-4567891234',
  };

  const mockBooksService = {
    getAllBooks: jest.fn().mockResolvedValue([mockBook]),
    getBookById: jest.fn().mockResolvedValue(mockBook),
    createBook: jest.fn().mockResolvedValue(mockBook),
    updateBook: jest.fn().mockResolvedValue(mockBook),
    deleteBook: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: mockBooksService,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all books', async () => {
    const books = await controller.getAllBooks();
    expect(books).toEqual([mockBook]);
    expect(service.getAllBooks).toHaveBeenCalled();
  });

  it('should return a book by ID', async () => {
    const book = await controller.getBookById(1);
    expect(book).toEqual(mockBook);
    expect(service.getBookById).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException when book not found', async () => {
    service.getBookById = jest
      .fn()
      .mockRejectedValue(new NotFoundException('Book not found'));
    await expect(controller.getBookById(2)).rejects.toThrow(NotFoundException);
  });

  it('should create a book', async () => {
    const bookDto: BookDto = {
      title: 'Test Book',
      author: 'Test Author',
      isbn: '123-4567891234',
    };
    const createdBook = await controller.createBook(bookDto);
    expect(createdBook).toEqual(mockBook);
    expect(service.createBook).toHaveBeenCalledWith(bookDto);
  });

  it('should throw BadRequestException on create error', async () => {
    service.createBook = jest
      .fn()
      .mockRejectedValue(new BadRequestException('Failed to create'));
    const bookDto: BookDto = {
      title: 'Test Book',
      author: 'Test Author',
      isbn: '123-4567891234',
    };
    await expect(controller.createBook(bookDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should update a book', async () => {
    const bookDto: BookDto = {
      title: 'Updated Test Book',
      author: 'Test Author',
      isbn: '123-4567891234',
    };
    const updatedBook = await controller.updateBook(1, bookDto);
    expect(updatedBook).toEqual(mockBook);
    expect(service.updateBook).toHaveBeenCalledWith(1, bookDto);
  });

  it('should throw NotFoundException when updating non-existent book', async () => {
    service.updateBook = jest
      .fn()
      .mockRejectedValue(new NotFoundException('Book not found'));
    const bookDto: BookDto = {
      title: 'Updated Test Book',
      author: 'Test Author',
      isbn: '123-4567891234',
    };
    await expect(controller.updateBook(2, bookDto)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should delete a book', async () => {
    await controller.deleteBook(1);
    expect(service.deleteBook).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException when deleting non-existent book', async () => {
    service.deleteBook = jest
      .fn()
      .mockRejectedValue(new NotFoundException('Book not found'));
    await expect(controller.deleteBook(2)).rejects.toThrow(NotFoundException);
  });
});
