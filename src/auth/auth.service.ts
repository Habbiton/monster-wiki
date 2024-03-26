import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/users.service';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { SignInAuthResponseDto } from './dto/sign-in-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
  ) {}

  async signIn(username: string, pass: string): Promise<SignInAuthResponseDto> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isValidPassword = await this.bcryptService.comparePassword(
      pass,
      user.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user._id, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
