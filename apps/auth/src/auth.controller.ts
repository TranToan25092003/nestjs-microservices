import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from '@app/common';
import { UsersDocument } from './users/models/users.schema';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtGuard } from './guards/jwt.guard';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * ====================================
   * login
   * ====================================
   */
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@CurrentUser() user: UsersDocument, @Res({ passthrough: true }) response: Response) {
    await this.authService.login(user, response);
    response.send(user);
  }

  /**
   * ====================================
   * TCP call
   * ====================================
   */
  @UseGuards(JwtGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    return data?.user;
  }
}
