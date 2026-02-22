import { GenreEntity } from '../genres/genre.entity';
export declare class MovieEntity {
    id: number;
    title: string;
    genre_id: number;
    genre: GenreEntity;
    description: string;
    trailer_url: string;
    image_path: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}
