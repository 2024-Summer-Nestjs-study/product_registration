import { Injectable, Logger, NotFoundException, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../Entity/product.entity';
import { Repository } from 'typeorm';
import { ProductCreateDto } from './productDto/product.create.dto';
import { UserEntity } from '../Entity/user.entity';
import { ProductEditDto } from './productDto/product.edit.dto';
import { ProductDeleteDto } from './productDto/product.delete.dto';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productEntity: Repository<ProductEntity>,
  ) {}
  async create(query: ProductCreateDto, req: Request) {
    const user: UserEntity = new UserEntity();
    user.id = req['user'].id;
    const product: ProductEntity = new ProductEntity();
    product.name = query.name;
    product.price = query.price;
    product.user = user;
    await this.productEntity.save(product);
    this.logger.debug('🥳Logging...');
    return '상품등록이 되었습니다!';
  }
  async find(req: Request) {
    const data: ProductEntity[] = await this.productEntity.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          id: req['user'].id,
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
    if (!data[0]) {
      this.logger.error('☠️Logging...');
      throw new NotFoundException('등록된 상품이 없습니다.');
    }
    return data;
  }
  async edit(query: ProductEditDto, req: Request) {
    const data: ProductEntity = await this.productEntity.findOne({
      where: {
        name: query.name,
        user: {
          id: req['user'].id,
        },
      },
    });
    if (!data) {
      this.logger.error('☠️Logging...');
      throw new NotFoundException('등록되어있지 않은 상품입니다.');
    }
    await this.productEntity.update(
      { name: query.name },
      { price: query.price },
    );
    return data;
  }
  async delete(query: ProductDeleteDto, req: Request) {
    const data: ProductEntity = await this.productEntity.findOne({
      where: {
        name: query.name,
        user: {
          id: req['user'].id,
        },
      },
    });
    if (!data) {
      this.logger.error('☠️Logging...');
      throw new NotFoundException('등록되어있지 않는 상품 입니다.');
    }
    await this.productEntity.delete(data);
    this.logger.debug('Logging...');
    return '상품이 삭제되었습니다.';
  }
}
