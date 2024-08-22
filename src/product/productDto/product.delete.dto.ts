import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProductDeleteDto {
  @ApiProperty({ description: '상품 이름' })
  @IsString()
  name: string;
}
