import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ProductFindDto {
  @ApiProperty({ description: '상품을 등록한 userid' })
  @IsNumber()
  userid: number;
}
