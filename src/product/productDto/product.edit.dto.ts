import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ProductEditDto {
  @ApiProperty({ description: '상품 이름' })
  @IsString()
  name: string;
  @ApiProperty({ description: '상품 가격' })
  @IsNumber()
  price: number;
}
