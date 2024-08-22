import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ProductCreateDto {
  @ApiProperty({ description: '상품 이름' })
  @IsString()
  name: string;
  @ApiProperty({ description: '상품 가격' })
  @IsNumber()
  price: number;
}
