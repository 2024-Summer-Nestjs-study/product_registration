import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserDeleteDto {
  @ApiProperty({ description: '이름' })
  @IsString()
  userName: string;
  @ApiProperty({ description: '아이디' })
  @IsString()
  userID: string;
  @ApiProperty({ description: '비밀번호' })
  @IsString()
  userPW: string;
}
