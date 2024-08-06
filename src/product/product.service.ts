import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "../Entity/product.entity";
import { Repository } from "typeorm";
import { ProductCreateDto } from "./productDto/product.create.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productEntity: Repository<ProductEntity>,
  ) {}
  async create(query: ProductCreateDto){
    const data =
  }
}
