import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreateDto } from './productDto/product.create.dto';
import { ProductFindDto } from './productDto/product.find.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('create')
  async create(@Query() query: ProductCreateDto) {
    return this.productService.create(query);
  }
  @Get('find')
  async find(@Query() query: ProductFindDto) {
    return this.productService.find(query);
  }
}
