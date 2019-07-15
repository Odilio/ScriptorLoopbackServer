import { Count, Filter, Where } from '@loopback/repository';
import { User } from '../models';
import { UserRepository, Credentials } from '../repositories';
import { UserService, TokenService } from '@loopback/authentication';
import { PasswordHasher } from '../services/hash.password.bcryptjs';
export declare class UserController {
    userRepository: UserRepository;
    passwordHasher: PasswordHasher;
    jwtService: TokenService;
    userService: UserService<User, Credentials>;
    constructor(userRepository: UserRepository, passwordHasher: PasswordHasher, jwtService: TokenService, userService: UserService<User, Credentials>);
    create(user: User): Promise<User>;
    login(credentials: Credentials): Promise<{
        token: string;
    }>;
    count(where?: Where<User>): Promise<Count>;
    find(filter?: Filter<User>): Promise<User[]>;
    updateAll(user: User, where?: Where<User>): Promise<Count>;
    findById(id: number): Promise<User>;
    updateById(id: number, user: User): Promise<void>;
    replaceById(id: number, user: User): Promise<void>;
    deleteById(id: number): Promise<void>;
}
