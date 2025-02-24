import { Body, Controller, Post } from '@nestjs/common';
import { createUSerDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUSer(@Body() createUserDto: createUSerDto) {}
}
