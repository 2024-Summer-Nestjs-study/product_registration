import { ApiProperty } from '@nestjs/swagger';

export class ProductEditDto {
  @ApiProperty({ description: '상품 이름' })
  name: string;
  @ApiProperty({ description: '상품 가격' })
  price: number;
}
