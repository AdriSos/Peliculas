import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { GenreEntity } from '../genres/genre.entity';

@Entity('movies')
export class MovieEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  title: string;

  @Column()
  genre_id: number;

  @ManyToOne(() => GenreEntity, { eager: true })
  @JoinColumn({ name: 'genre_id' })
  genre: GenreEntity;

  @Column({ type: 'text' })
  description: string;

  @Column()
  trailer_url: string;

  @Column()
  image_path: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;
}