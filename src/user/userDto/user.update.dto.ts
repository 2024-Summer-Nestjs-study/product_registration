import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto {
  @ApiProperty({ description: '아이디' })
  userID: string;
  @ApiProperty({ description: '비밀번호' })
  userPW: string;
}
