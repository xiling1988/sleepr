import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { CreateUserDto, UpdateUserDto } from './dto/';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository ) {}

    async create(createUserDto: CreateUserDto) {
        return this.userRepository.create(createUserDto);
    }


}
