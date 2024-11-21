import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { CreateUserDto, UpdateUserDto } from './dto/';
import * as argon2 from "argon2";

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository ) {}
    
    async create(createUserDto: CreateUserDto) {
        return this.userRepository.create({
            ...createUserDto,
            password: await argon2.hash(createUserDto.password),
        });
    }

    async verifyUser(email: string, password: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        if (!await argon2.verify(user.password, password)) {
            throw new UnauthorizedException('Invalid password');
        }
        return user;
    }

}
