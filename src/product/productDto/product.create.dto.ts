import { ApiProperty } from '@nestjs/swagger';

export class ProductCreateDto {
  @ApiProperty({ description: '상품 이름' })
  name: string;
  @ApiProperty({ description: '상품 가격' })
  price: number;
}
