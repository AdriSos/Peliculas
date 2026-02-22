"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const bcrypt = __importStar(require("bcrypt"));
const config_1 = require("@nestjs/config");
const user_entity_1 = require("./user.entity");
const password_util_1 = require("../utils/password.util");
const mail_service_1 = require("../mail/mail.service");
const auth_service_1 = require("../auth/auth.service");
let UsersService = class UsersService {
    usersRepo;
    mail;
    auth;
    config;
    constructor(usersRepo, mail, auth, config) {
        this.usersRepo = usersRepo;
        this.mail = mail;
        this.auth = auth;
        this.config = config;
    }
    async create(dto) {
        const existing = await this.usersRepo.findOne({ where: { email: dto.email } });
        if (existing)
            throw new common_1.BadRequestException('El correo ya está registrado');
        const plainPassword = (0, password_util_1.generateRandomPassword)(8);
        const password_hash = await bcrypt.hash(plainPassword, 10);
        const user = this.usersRepo.create({
            ...dto,
            password_hash,
            is_active: true,
            email_verified: false,
        });
        const saved = await this.usersRepo.save(user);
        const token = await this.auth.createVerificationToken(saved.id);
        const verifyLink = `${this.config.get('APP_BASE_URL')}/verify-email?token=${token}`;
        await this.mail.sendCredentialsEmail(saved.email, saved.email, plainPassword, verifyLink);
        return {
            message: 'Usuario creado. Se enviaron credenciales y link de verificación.',
            user_id: saved.id,
        };
    }
    async findAll() {
        const users = await this.usersRepo.find({ order: { id: 'DESC' } });
        return users.map(u => ({
            id: u.id,
            full_name: `${u.first_name} ${u.last_name_paternal} ${u.last_name_maternal}`,
            email: u.email,
            role: u.role,
            is_active: u.is_active,
            email_verified: u.email_verified,
            created_at: u.created_at,
        }));
    }
    async update(id, dto) {
        const user = await this.usersRepo.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('Usuario no encontrado');
        Object.assign(user, dto);
        await this.usersRepo.save(user);
        return { message: 'Usuario actualizado' };
    }
    async setActive(id, is_active) {
        const user = await this.usersRepo.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('Usuario no encontrado');
        user.is_active = is_active;
        await this.usersRepo.save(user);
        return { message: is_active ? 'Usuario activado' : 'Usuario inactivado' };
    }
    async remove(id) {
        const user = await this.usersRepo.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('Usuario no encontrado');
        await this.usersRepo.delete(id);
        return { message: 'Usuario eliminado' };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        mail_service_1.MailService,
        auth_service_1.AuthService,
        config_1.ConfigService])
], UsersService);
//# sourceMappingURL=users.service.js.map