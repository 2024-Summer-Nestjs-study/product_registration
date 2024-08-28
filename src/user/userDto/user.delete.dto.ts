import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserDeleteDto {
  @ApiProperty({ description: '비밀번호' })
  @IsString()
  userPW: string;
}
