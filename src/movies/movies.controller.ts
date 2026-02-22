import {
  Body, Controller, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

function fileName(req, file, cb) {
  const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
  cb(null, `${unique}${extname(file.originalname)}`);
}

function fileFilter(req, file, cb) {
  if (!file.mimetype.startsWith('image/')) return cb(new Error('Solo imágenes'), false);
  cb(null, true);
}

@Controller('movies')
export class MoviesController {
  constructor(private movies: MoviesService) {}

  // CATÁLOGO (móvil): solo activas
  @Get('catalog')
  catalog() {
    return this.movies.findCatalog();
  }

  // ADMIN: ver todas
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  adminList() {
    return this.movies.findAllAdmin();
  }

  // ADMIN: crear con imagen
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({ destination: './uploads', filename: fileName }),
    fileFilter,
  }))
  create(@Body() dto: any, @UploadedFile() file: Express.Multer.File) {
  if (!file) throw new Error('Imagen requerida');
  const image_path = `/uploads/${file.filename}`;

  // ✅ convertir genre_id a número
  dto.genre_id = Number(dto.genre_id);

  return this.movies.create(dto as CreateMovieDto, image_path);
}

  // ADMIN: update (opcional imagen)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({ destination: './uploads', filename: fileName }),
    fileFilter,
  }))
  update(@Param('id') id: string, @Body() dto: any, @UploadedFile() file?: Express.Multer.File) {
  const image_path = file ? `/uploads/${file.filename}` : undefined;

  if (dto.genre_id !== undefined) dto.genre_id = Number(dto.genre_id);

  return this.movies.update(Number(id), dto, image_path);
}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id/activate')
  activate(@Param('id') id: string) {
    return this.movies.setActive(Number(id), true);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.movies.setActive(Number(id), false);
  }
}