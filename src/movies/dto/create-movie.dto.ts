import { IsInt, IsString, MinLength, IsUrl } from 'class-validator';

export class CreateMovieDto {
  @IsString() @MinLength(1)
  title: string;

  @IsInt()
  genre_id: number;

  @IsString() @MinLength(1)
  description: string;

  @IsUrl()
  trailer_url: string;
}