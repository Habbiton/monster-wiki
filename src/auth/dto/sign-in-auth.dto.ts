import { IsDefined, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInAuthDto {
  @ApiProperty({
    description: 'Username for login',
    example: 'bored-mike',
  })
  @IsDefined()
  @IsString()
  readonly username: string;

  @ApiProperty({
    description: 'Password for login',
    example: 'thisisnotrealboredmikepass',
  })
  @IsDefined()
  @IsString()
  readonly password: string;
}

export class SignInAuthResponseDto {
  @ApiProperty({
    description: 'JWT for authentication',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJvcmVkLW1pa2UiLCJzdWIiOiI2NjAxYWQ4MzUyMWYxMTNhNzgwN2NlM2UiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MTEzODgyNjUsImV4cCI6MTcxMTM5NDI2NX0.47eR9PCjJ3KGKAyUap1dLvsxqQ98rKMQUi79Xnh2d8M',
  })
  @IsDefined()
  @IsString()
  readonly access_token: string;
}
