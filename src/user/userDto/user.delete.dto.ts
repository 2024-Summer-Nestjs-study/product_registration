import { ApiProperty } from '@nestjs/swagger';

export class UserDeleteDto {
  @ApiProperty({ description: '이름' })
  userName: string;
  @ApiProperty({ description: '아이디' })
  userID: string;
  @ApiProperty({ description: '비밀번호' })
  userPW: string;
}
