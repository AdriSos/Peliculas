import { Repository } from 'typeorm';
import { MovieEntity } from './movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
export declare class MoviesService {
    private repo;
    constructor(repo: Repository<MovieEntity>);
    create(dto: CreateMovieDto, image_path: string): Promise<MovieEntity>;
    findAllAdmin(): Promise<MovieEntity[]>;
    findCatalog(): Promise<MovieEntity[]>;
    update(id: number, dto: UpdateMovieDto, image_path?: string): Promise<MovieEntity>;
    setActive(id: number, is_active: boolean): Promise<MovieEntity>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
