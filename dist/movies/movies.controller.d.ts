import { MoviesService } from './movies.service';
export declare class MoviesController {
    private movies;
    constructor(movies: MoviesService);
    catalog(): Promise<import("./movie.entity").MovieEntity[]>;
    adminList(): Promise<import("./movie.entity").MovieEntity[]>;
    create(dto: any, file: Express.Multer.File): Promise<import("./movie.entity").MovieEntity>;
    update(id: string, dto: any, file?: Express.Multer.File): Promise<import("./movie.entity").MovieEntity>;
    activate(id: string): Promise<import("./movie.entity").MovieEntity>;
    deactivate(id: string): Promise<import("./movie.entity").MovieEntity>;
}
