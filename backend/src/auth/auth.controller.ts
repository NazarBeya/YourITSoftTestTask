import { Body, Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UserDtoCreate, UserloginDto } from 'src/user/dto/user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: UserDtoCreate, @Res() res: Response) {
    try {
      const accesToken = await this.authService.register(body);
      return res.json({ accesToken }).status(HttpStatus.OK);
    } catch (e) {
      res.json({
        status: e.status,
        message: e.message,
      });
    }
  }
  @Post('login')
  async login(@Body() body: UserloginDto, @Res() res: Response) {
    try {
      const accesToken = await this.authService.login(body);
      return res.json({ accesToken }).status(HttpStatus.OK);
    } catch (e) {
      res.json({
        status: e.status,
        message: e.message,
      });
    }
  }
}
