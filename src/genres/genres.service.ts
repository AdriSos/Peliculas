import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenreEntity } from './genre.entity';

@Injectable()
export class GenresService {
  constructor(@InjectRepository(GenreEntity) private repo: Repository<GenreEntity>) {}

  findAll() {
    return this.repo.find({ order: { name: 'ASC' } });
  }
}