import { GenresService } from './genres.service';
export declare class GenresController {
    private genres;
    constructor(genres: GenresService);
    findAll(): Promise<import("./genre.entity").GenreEntity[]>;
}
