import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { UsersDocument } from './models/users.schema';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepository) {}

  /**
   * ====================================
   * create user
   * ====================================
   */
  async create(createUserDto: createUserDto) {
    await this.validateCreateUserDto(createUserDto);

    return await this.userRepo.create({
      ...createUserDto,
      password: bcrypt.hashSync(createUserDto.password, 10),
    });
  }

  /**
   * ====================================
   *
   * ====================================
   */
  private async validateCreateUserDto(createUserDto: createUserDto) {
    try {
      await this.userRepo.findOne({ email: createUserDto.email });
    } catch (error) {
      return;
    }

    throw new UnprocessableEntityException('email already exists');
  }

  /**
   * ====================================
   * validate user
   * ====================================
   */
  async verifyUser(email: string, password: string): Promise<UsersDocument> {
    try {
      const user = await this.userRepo.findOne({ email: email });
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw new UnauthorizedException('Credentials are not valid');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * ====================================
   * get user
   * ====================================
   */
  async getUser({ _id }: GetUserDto) {
    try {
      return await this.userRepo.findOne({
        _id,
      });
    } catch (error) {
      throw error;
    }
  }
}
