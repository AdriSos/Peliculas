import { IsInt, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateMovieDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsInt() genre_id?: number;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsUrl() trailer_url?: string;
}