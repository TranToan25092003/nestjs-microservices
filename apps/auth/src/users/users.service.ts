import { Injectable } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepository) {}

  async create(createUserDto: createUserDto) {
    this.userRepo.create(createUserDto);
  }
}
