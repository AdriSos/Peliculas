import { Repository } from 'typeorm';
import { GenreEntity } from './genre.entity';
export declare class GenresService {
    private repo;
    constructor(repo: Repository<GenreEntity>);
    findAll(): Promise<GenreEntity[]>;
}
