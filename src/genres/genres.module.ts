import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreEntity } from './genre.entity';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GenreEntity])],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}