import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../Entity/product.entity';
import { Repository } from 'typeorm';
import { ProductCreateDto } from './productDto/product.create.dto';
import { UserEntity } from '../Entity/user.entity';
import { ProductFindDto } from './productDto/product.find.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productEntity: Repository<ProductEntity>,
  ) {}
  async create(query: ProductCreateDto) {
    const user: UserEntity = new UserEntity();
    user.id = query.id;
    const product: ProductEntity = new ProductEntity();
    product.name = query.name;
    product.price = query.price;
    product.user = user;

    await this.productEntity.save(product);
    return '상품등록이 되었습니다!';
  }
  async find(query: ProductFindDto) {
    const data: ProductEntity[] = await this.productEntity.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          id: query.userid,
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
}
