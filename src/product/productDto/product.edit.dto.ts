import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';
export class ProductEditDto {
  @ApiProperty({ description: '상품 이름' })
  @IsString()
  name: string;
  @ApiProperty({ description: '상품 가격' })
  @IsNumberString()
  price: number;
}
