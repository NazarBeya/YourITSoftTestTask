import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Response } from 'express';
import { JwtAuthenticateGuard } from 'src/auth/jwt.guard';
import { PublicUserData } from './interface/user.interface';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAllUsers(@Res() res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users).status(HttpStatus.OK);
    } catch (eror) {
      res.sendStatus(eror.status);
    }
  }
  @UseGuards(JwtAuthenticateGuard)
  @Delete('delete/:userId')
  async deleteUser(@Param('userId') userId: string, @Res() res: Response) {
    try {
      await this.userService.delete(userId);
      res.sendStatus(HttpStatus.OK);
    } catch (error) {
      res.sendStatus(error.status);
    }
  }
  @UseGuards(JwtAuthenticateGuard)
  @Put('update/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Res() res: Response,
    @Body() body: Omit<PublicUserData, 'password'>,
  ) {
    try {
      const updateUser = await this.userService.update(userId, body);
      res.json(updateUser);
    } catch (error) {
      res.sendStatus(error.status);
    }
  }
}
