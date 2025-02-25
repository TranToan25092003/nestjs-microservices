import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { CurrentUser } from '@app/common';
import { UsersDocument } from './models/users.schema';
import { JwtGuard } from '../guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('')
  async createUSer(@Body() createUserDto: createUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtGuard)
  async getUser(@CurrentUser() user: UsersDocument) {
    return user;
  }
}
