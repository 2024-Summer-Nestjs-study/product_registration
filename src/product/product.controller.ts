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

@Controller('product')
@UseGuards(AccessGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get('create')
  async create(@Query() query: ProductCreateDto, @Request() req: Request) {
    return this.productService.create(query, req);
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
