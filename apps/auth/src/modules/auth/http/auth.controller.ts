import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { RegisterUserRequestDto } from '../../user/application/dto/create-user-request.dto';
import { LoginRequestDto } from '../../user/application/dto/login-request.dto';
import { JwtAuthGuard } from '../application/guards/jwt-auth.guard';
import { CurrentUser } from '../application/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserRequest: RegisterUserRequestDto) {
    return this.authService.register(createUserRequest);
  }

  @Post('login')
  async login(@Body() loginRequestDto: LoginRequestDto) {
    return this.authService.login(loginRequestDto);
  }

  @Post('refresh')
  async refreshToken(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@CurrentUser() user: any) {
    return user;
  }
}