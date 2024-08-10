import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './Entity/user.entity';
import { ProductEntity } from './Entity/product.entity';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: '113.198.230.24',
      port: 352,
      username: 'jin',
      password: '1234',
      database: 'registration',
      entities: [UserEntity, ProductEntity],
      synchronize: true,
    }),
    UserModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [TypeOrmModule],
})
export class AppModule {}
