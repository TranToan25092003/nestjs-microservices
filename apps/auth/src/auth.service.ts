import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersDocument } from './users/models/users.schema';
import { Response } from 'express';

@Injectable()
export class AuthService {
  /**
   * ====================================
   * constructor
   * ====================================
   */
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * ====================================
   * login
   * ====================================
   */
  async login(user: UsersDocument, res: Response) {
    try {
      const tokenPayload = {
        userId: user._id.toHexString(),
      };

      const expires = new Date();
      expires.setSeconds(expires.getSeconds() + this.configService.get('JWT_EXPIRATION'));

      const token = this.jwtService.sign(tokenPayload);

      res.cookie('Authentication', token, {
        httpOnly: true,
        expires,
      });
    } catch (error) {
      throw error;
    }
  }
}
