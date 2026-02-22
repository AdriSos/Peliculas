import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieEntity } from './movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(@InjectRepository(MovieEntity) private repo: Repository<MovieEntity>) {}

  async create(dto: CreateMovieDto, image_path: string) {
    const movie = this.repo.create({ ...dto, image_path, is_active: true });
    return this.repo.save(movie);
  }

  async findAllAdmin() {
    return this.repo.find({ order: { id: 'DESC' } });
  }

  async findCatalog() {
    return this.repo.find({ where: { is_active: true }, order: { id: 'DESC' } });
  }

  async update(id: number, dto: UpdateMovieDto, image_path?: string) {
    const movie = await this.repo.findOne({ where: { id } });
    if (!movie) throw new NotFoundException('Película no encontrada');

    Object.assign(movie, dto);
    if (image_path) movie.image_path = image_path;

    return this.repo.save(movie);
  }

  async setActive(id: number, is_active: boolean) {
    const movie = await this.repo.findOne({ where: { id } });
    if (!movie) throw new NotFoundException('Película no encontrada');
    movie.is_active = is_active;
    return this.repo.save(movie);
  }

  async remove(id: number) {
    const movie = await this.repo.findOne({ where: { id } });
    if (!movie) throw new NotFoundException('Película no encontrada');
    await this.repo.delete(id);
    return { message: 'Película eliminada' };
  }
}