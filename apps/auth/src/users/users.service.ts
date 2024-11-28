import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { CreateUserDto, GetUserDto, UpdateUserDto } from './dto/';
import * as argon2 from "argon2";
import { get } from 'http';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository ) {}
    
    async create(createUserDto: CreateUserDto) {
        await this.validateCreateUserDto(createUserDto);
        return this.userRepository.create({
            ...createUserDto,
            password: await argon2.hash(createUserDto.password),
        });
    }

    private async validateCreateUserDto(createUserDto: CreateUserDto) {
        try {
            await this.userRepository.findOne({ where: { email: createUserDto.email } });
        } catch (error) {
            return;
        }
        throw new UnauthorizedException('User with that email already exists');
    }

    async getUser(getUserDto: GetUserDto) {
        console.log('getting user with id:', getUserDto);
        return await this.userRepository.findOne({ where: { id: getUserDto.id } });
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
