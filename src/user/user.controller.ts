import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegistDto } from '../userDto/user.regist.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('regist')
  async regist(@Query() query: UserRegistDto) {
    return this.userService.regist(query);
  }
}
