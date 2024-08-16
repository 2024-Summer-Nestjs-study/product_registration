import { Injectable, NotFoundException, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../Entity/product.entity';
import { Repository } from 'typeorm';
import { ProductCreateDto } from './productDto/product.create.dto';
import { UserEntity } from '../Entity/user.entity';
import { ProductFindDto } from './productDto/product.find.dto';
import { ProductEditDto } from './productDto/product.edit.dto';
import { ProductDeleteDto } from './productDto/product.delete.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productEntity: Repository<ProductEntity>,
  ) {}
  async create(query: ProductCreateDto, @Request() req: Request) {
    const user: UserEntity = new UserEntity();
    user.id = req['user'].id;
    const product: ProductEntity = new ProductEntity();
    product.name = query.name;
    product.price = query.price;
    product.user = user;

    await this.productEntity.save(product);
    return '상품등록이 되었습니다!';
  }
  async find(query: ProductFindDto, @Request() req: Request) {
    const data: ProductEntity[] = await this.productEntity.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          id: req['user'].userid,
        },
      },
      select: {
        user: {
          id: false,
          userName: true,
          userID: false,
          userPW: false,
        },
      },
    });
    console.log(data);
    if (!data[0]) throw new NotFoundException('등록되어 있지 않습니다.');
    return data;
  }
  async edit(query: ProductEditDto) {
    const data: ProductEntity = await this.productEntity.findOne({
      where: {
        name: query.name,
      },
    });
    if (!data) {
      throw new NotFoundException('등록되어있지 않은 상품입니다.');
    }
    await this.productEntity.update(
      { name: query.name },
      { price: query.price },
    );
    return data;
  }
  async delete(query: ProductDeleteDto) {
    const data: ProductEntity = await this.productEntity.findOne({
      where: {
        name: query.name,
      },
    });
    if (!data) throw new NotFoundException('등록되어있지 않는 상품 입니다.');
    await this.productEntity.delete(data);
    return '상품이 삭제되었습니다.';
  }
}
