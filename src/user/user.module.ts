import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../Entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ProductService } from '../product/product.service';
import { ProductEntity } from '../Entity/product.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ProductEntity]),
    JwtModule.register({}),
  ],
  controllers: [UserController],
  providers: [UserService, ProductService],
  exports: [TypeOrmModule],
})
export class UserModule {}
