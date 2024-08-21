import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Product Registration')
    .setDescription(
      '이 서비스는 회원가입으로 회원 정보가 저장되고 권한이 주어지면 상품 등록, 회원에 대한 상품 찾기, 상품 정보 수정, 상품 삭제가 가능한 서비스입니다.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('OS', app, document);

  await app.listen(3003);
}
bootstrap();
