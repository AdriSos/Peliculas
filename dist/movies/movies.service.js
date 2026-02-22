"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const movie_entity_1 = require("./movie.entity");
let MoviesService = class MoviesService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto, image_path) {
        const movie = this.repo.create({ ...dto, image_path, is_active: true });
        return this.repo.save(movie);
    }
    async findAllAdmin() {
        return this.repo.find({ order: { id: 'DESC' } });
    }
    async findCatalog() {
        return this.repo.find({ where: { is_active: true }, order: { id: 'DESC' } });
    }
    async update(id, dto, image_path) {
        const movie = await this.repo.findOne({ where: { id } });
        if (!movie)
            throw new common_1.NotFoundException('Película no encontrada');
        Object.assign(movie, dto);
        if (image_path)
            movie.image_path = image_path;
        return this.repo.save(movie);
    }
    async setActive(id, is_active) {
        const movie = await this.repo.findOne({ where: { id } });
        if (!movie)
            throw new common_1.NotFoundException('Película no encontrada');
        movie.is_active = is_active;
        return this.repo.save(movie);
    }
    async remove(id) {
        const movie = await this.repo.findOne({ where: { id } });
        if (!movie)
            throw new common_1.NotFoundException('Película no encontrada');
        await this.repo.delete(id);
        return { message: 'Película eliminada' };
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movie_entity_1.MovieEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MoviesService);
//# sourceMappingURL=movies.service.js.map