import { ApiProperty } from '@nestjs/swagger';

export class ProductDeleteDto {
  @ApiProperty({ description: '상품 이름' })
  name: string;
}
