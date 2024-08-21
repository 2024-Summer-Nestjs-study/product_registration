import { ApiProperty } from '@nestjs/swagger';

export class ProductFindDto {
  @ApiProperty({ description: '상품을 등록한 userid' })
  userid: number;
}
