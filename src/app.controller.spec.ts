import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Books API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /books', () => {
    it('should return all books', async () => {
      const response = await request(app.getHttpServer()).get('/books');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /books/:id', () => {
    it('should return a book by ID', async () => {
      const response = await request(app.getHttpServer()).get('/books/1');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
    });

    it('should return 404 for a non-existing book', async () => {
      const response = await request(app.getHttpServer()).get('/books/9999999');
      expect(response.status).toBe(404);
    });
  });

  describe('POST /books', () => {
    it('should create a new book', async () => {
      const newBook = {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        isbn: '9780743273565',
      };

      const response = await request(app.getHttpServer())
        .post('/books')
        .send(newBook);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(newBook.title);
    });

    it('should return 400 for invalid data', async () => {
      const invalidBook = {
        author: 'F. Scott Fitzgerald',
        // Missing title and ISBN
      };

      const response = await request(app.getHttpServer())
        .post('/books')
        .send(invalidBook);

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /books/:id', () => {
    it('should update a book', async () => {
      const updatedBook = {
        title: 'The Great Gatsby - Updated',
        author: 'F. Scott Fitzgerald',
        isbn: '9780743273565',
      };

      const response = await request(app.getHttpServer())
        .put('/books/1')
        .send(updatedBook);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe(updatedBook.title);
    });

    it('should return 404 for a non-existing book', async () => {
      const response = await request(app.getHttpServer())
        .put('/books/999')
        .send({ title: 'Not Found' });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /books/:id', () => {
    it('should delete a book', async () => {
      const response = await request(app.getHttpServer()).delete('/books/1');
      expect(response.status).toBe(204);
    });

    it('should return 404 for a non-existing book', async () => {
      const response = await request(app.getHttpServer()).delete('/books/999');
      expect(response.status).toBe(404);
    });
  });
});
