import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { CreateUserDto, UpdateUserDto } from './dto/';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository ) {}

    
    async create(createUserDto: CreateUserDto) {
        return this.userRepository.create({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10),
            
        });
    }
    async validateUser(email: string, password: string) {
        const user = await this.userRepository.findOne({ where: { email } });

        const passwordMatch = await bcrypt.compare(password, user.password);
        return null;
    }


}
