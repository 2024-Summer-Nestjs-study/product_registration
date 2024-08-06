import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './Entity/user.entity';
import { ProductEntity } from './Entity/product.entity';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '0000',
      database: 'registration',
      entities: [UserEntity, ProductEntity],
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
