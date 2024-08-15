import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegistDto } from './userDto/user.regist.dto';
import { UserLoginDto } from './userDto/user.login.dto';
import { UserUpdateDto } from './userDto/user.update.dto';
import { UserDeleteDto } from './userDto/user.delete.dto';
import { AccessGuard } from '../jwt/access.guard';
import { RefreshGuard } from '../jwt/refresh.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('regist')
  async regist(@Query() query: UserRegistDto) {
    return this.userService.regist(query);
  }
  @Get('login')
  async login(@Query() query: UserLoginDto) {
    return this.userService.login(query);
  }
  @Patch('update')
  async update(@Query() query: UserUpdateDto) {
    return this.userService.update(query);
  }
  @Delete('delete')
  async delete(@Query() query: UserDeleteDto) {
    return this.userService.delete(query);
  }
  @Post('hi')
  @UseGuards(AccessGuard)
  async hi(@Request() req: Request) {
    return req['user'];
  }
  @UseGuards(RefreshGuard)
  @Post('getAccess')
  async getAccess(@Request() req: Request) {
    return this.userService.getAccess(req);
  }
}
