import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsISBN, IsNumber } from 'class-validator';

export class GetBookDto {
  @ApiProperty({ description: 'Title of the book' })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Title of the book' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Author of the book' })
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty({ description: 'ISBN of the book' })
  @IsNotEmpty()
  @IsISBN()
  isbn: string;
}

export class BookDto {
  @ApiProperty({ description: 'Title of the book' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Author of the book' })
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty({ description: 'ISBN of the book' })
  @IsNotEmpty()
  @IsISBN()
  isbn: string;
}
