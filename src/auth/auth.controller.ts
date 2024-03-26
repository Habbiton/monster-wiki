import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { SignInAuthDto, SignInAuthResponseDto } from './dto/sign-in-auth.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly bcryptService: BcryptService,
  ) {}

  @ApiResponse({ status: 200, description: 'OK', type: SignInAuthResponseDto })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInAuthDto): Promise<SignInAuthResponseDto> {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
