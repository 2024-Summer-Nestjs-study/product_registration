import {
  Request,
  Controller,
  Delete,
  Get,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreateDto } from './productDto/product.create.dto';
import { ProductFindDto } from './productDto/product.find.dto';
import { ProductEditDto } from './productDto/product.edit.dto';
import { ProductDeleteDto } from './productDto/product.delete.dto';
import { AccessGuard } from '../jwt/access.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('product')
@ApiTags('Product Api')
@UseGuards(AccessGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get('create')
  @ApiOperation({
    summary: '상품 등록 API',
    description: '해당 사용자의 id로 상품이 등록된다.',
  })
  @ApiResponse({
    status: 201,
    description: '상품등록이 되었습니다!',
  })
  @ApiBearerAuth()
  async create(@Query() query: ProductCreateDto, @Request() req: Request) {
    return this.productService.create(query, req);
  }
  @Get('find')
  @ApiOperation({
    summary: '상품 정보 출력 API',
    description: '해당 사용자가 어떤 상품을 등록했는지 알 수 있는 Api이다.',
  })
  @ApiResponse({
    status: 201,
    description: '상품등록에 대한 data 출력.',
  })
  @ApiResponse({
    status: 404,
    description: '등록되어 있지 않습니다.',
  })
  @ApiBearerAuth()
  async find(@Query() query: ProductFindDto, @Request() req: Request) {
    return this.productService.find(query, req);
  }
  @Patch('edit')
  @ApiOperation({
    summary: '상품 정보 수정 API',
    description: '상품에 대한 정보를 수정한다.',
  })
  @ApiResponse({
    status: 201,
    description: '변경된 상품에 대한 정보 출력.',
  })
  @ApiResponse({
    status: 404,
    description: '등록되어있지 않은 상품입니다.',
  })
  @ApiBearerAuth()
  async edit(@Query() query: ProductEditDto) {
    return this.productService.edit(query);
  }
  @Delete('delete')
  @ApiOperation({
    summary: '상품 정보 삭제 API',
    description: '상품에 대한 정보를 삭제.',
  })
  @ApiResponse({
    status: 201,
    description: '상품이 삭제되었습니다.',
  })
  @ApiResponse({
    status: 404,
    description: '등록되어있지 않는 상품 입니다.',
  })
  @ApiBearerAuth('access-token')
  async delete(@Query() query: ProductDeleteDto) {
    return this.productService.delete(query);
  }
}
