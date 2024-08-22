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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('user')
@ApiTags('UserApi')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('regist')
  @ApiOperation({
    summary: '사용자 생성 API',
    description: '사용자를 생성한다.',
  })
  @ApiResponse({
    status: 201,
    description: '축하합니다! 회원가입에 성공하였습니다.:)',
  })
  async regist(@Query() query: UserRegistDto) {
    return this.userService.regist(query);
  }
  @Get('login')
  @ApiOperation({
    summary: '사용자 로그인 API',
    description: '사용자에게 토큰(권한)이 주어진다.',
  })
  @ApiResponse({
    status: 201,
    description: 'accessToken, refreshToken 발급',
  })
  @ApiResponse({
    status: 404,
    description: '옳지 않은 회원정보입니다.',
  })
  async login(@Query() query: UserLoginDto) {
    return this.userService.login(query);
  }
  @Patch('update')
  @ApiOperation({
    summary: '사용자 정보 수정 API',
    description: '사용자에 대한 정보를 수정한다.',
  })
  @ApiResponse({
    status: 201,
    description: '김영진님의 회원정보가 변경되었습니다!',
  })
  @ApiResponse({
    status: 404,
    description: '등록되어있지 않은 회원정보 입니다.',
  })
  @ApiBearerAuth('access_token')
  @UseGuards(AccessGuard)
  async update(@Query() query: UserUpdateDto, @Request() req: Request) {
    return this.userService.update(query, req);
  }
  @Delete('delete')
  @ApiOperation({
    summary: '사용자 정보 삭제 API',
    description: '사용자에 대한 정보, 상품을 삭제한다.',
  })
  @ApiResponse({
    status: 201,
    description: '회원탈퇴 되었습니다.',
  })
  @ApiResponse({
    status: 404,
    description: '저장되어있지 않은 회원정보입니다.',
  })
  @ApiBearerAuth('access_token')
  @UseGuards(AccessGuard)
  async delete(@Query() query: UserDeleteDto, @Request() req: Request) {
    return this.userService.delete(query, req);
  }
  @Post('getAccess')
  @ApiOperation({
    summary: '사용자에게 AccessToken을 재발급해주는 API',
    description: '해당 사용자에게 AccessToken을 재발급.',
  })
  @ApiResponse({
    status: 201,
    description: 'accessToken 발급',
  })
  async getAccess(@Request() req: Request) {
    return this.userService.getAccess(req);
  }
}
