import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({ description: '아이디' })
  @IsString()
  userID: string;
  @ApiProperty({ description: '비밀번호' })
  @IsString()
  userPW: string;
}
