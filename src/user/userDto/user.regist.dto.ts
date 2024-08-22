import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export class UserRegistDto {
  @ApiProperty({ description: '이름' })
  @IsString()
  @IsNumberString()
  userName: string;
  @ApiProperty({ description: '아이디' })
  @IsString()
  userID: string;
  @ApiProperty({ description: '비밀번호' })
  @IsString()
  userPW: string;
}
