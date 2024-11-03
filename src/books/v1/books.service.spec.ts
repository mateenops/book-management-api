import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { Books } from './books.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('BooksService', () => {
  let service: BooksService;
  let repository: Repository<Books>;

  const mockBook = {
    id: 1,
    title: 'Test Book',
    author: 'Test Author',
    isbn: '123-4567891234',
  };

  const mockBooksRepository = {
    find: jest.fn().mockResolvedValue([mockBook]),
    findOneBy: jest.fn().mockResolvedValue(mockBook),
    save: jest.fn().mockResolvedValue(mockBook),
    update: jest.fn().mockResolvedValue(mockBook),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Books),
          useValue: mockBooksRepository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    repository = module.get<Repository<Books>>(getRepositoryToken(Books));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all books', async () => {
    const books = await service.getAllBooks();
    expect(books).toEqual([mockBook]);
    expect(mockBooksRepository.find).toHaveBeenCalled();
  });

  it('should return a book by ID', async () => {
    const book = await service.getBookById(1);
    expect(book).toEqual(mockBook);
    expect(mockBooksRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should throw NotFoundException if book not found', async () => {
    mockBooksRepository.findOneBy.mockResolvedValue(null);
    await expect(service.getBookById(2)).rejects.toThrow(NotFoundException);
  });

  it('should create a book', async () => {
    const createdBook = await service.createBook(mockBook);
    expect(createdBook).toEqual(mockBook);
    expect(mockBooksRepository.save).toHaveBeenCalledWith(mockBook);
  });

  it('should throw BadRequestException on create error', async () => {
    mockBooksRepository.save.mockRejectedValue(new Error('Error'));
    await expect(service.createBook(mockBook)).rejects.toThrow(
      BadRequestException,
    );
  });

  describe('updateBook', () => {
    it('should update a book', async () => {
      const mockBookId = 1;
      const mockBookDto = { title: 'Updated Title', author: 'Updated Author', isbn: '1234567890123' };

      // Mock the behavior of findOneBy to return a book object
      mockBooksRepository.findOneBy.mockResolvedValue({
        id: mockBookId,
        title: 'Old Title',
        author: 'Old Author',
        isbn: '9876543210123',
      });

      // Mock the update method
      mockBooksRepository.update.mockResolvedValue(undefined); // Just a placeholder

      const updatedBook = await service.updateBook(mockBookId, mockBookDto);

      expect(updatedBook).toEqual(expect.objectContaining(mockBookDto));
      expect(mockBooksRepository.findOneBy).toHaveBeenCalledWith({ id: mockBookId });
      expect(mockBooksRepository.update).toHaveBeenCalledWith(mockBookId, mockBookDto);
    });


  it('should throw NotFoundException if book not found during update', async () => {
    mockBooksRepository.findOneBy.mockResolvedValue(null);
    await expect(service.updateBook(2, mockBook)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should delete a book', async () => {
    await service.deleteBook(1);
    expect(mockBooksRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if book not found during delete', async () => {
    mockBooksRepository.delete.mockResolvedValue({ affected: 0 });
    await expect(service.deleteBook(2)).rejects.toThrow(NotFoundException);
  });
});
