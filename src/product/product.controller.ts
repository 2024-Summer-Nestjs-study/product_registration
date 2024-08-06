import { Controller, Delete, Get, Patch, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreateDto } from './productDto/product.create.dto';
import { ProductFindDto } from './productDto/product.find.dto';
import { ProductEditDto } from './productDto/product.edit.dto';
import { ProductDeleteDto } from './productDto/product.delete.dto';

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
  @Patch('edit')
  async edit(@Query() query: ProductEditDto) {
    return this.productService.edit(query);
  }
  @Delete('delete')
  async delete(@Query() query: ProductDeleteDto) {
    return this.productService.delete(query);
  }
}
