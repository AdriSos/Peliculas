import { Controller, Get } from '@nestjs/common';
import { GenresService } from './genres.service';

@Controller('genres')
export class GenresController {
  constructor(private genres: GenresService) {}

  @Get()
  findAll() {
    return this.genres.findAll();
  }
}   