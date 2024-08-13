import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../Entity/user.entity';
import { Repository } from 'typeorm';
import { UserRegistDto } from './userDto/user.regist.dto';
import { UserLoginDto } from './userDto/user.login.dto';
import { UserUpdateDto } from './userDto/user.update.dto';
import { UserDeleteDto } from './userDto/user.delete.dto';
import { ProductEntity } from '../Entity/product.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    private jwtService: JwtService,

    @InjectRepository(ProductEntity)
    private readonly productEntity: Repository<ProductEntity>,
  ) {}
  async regist(query: UserRegistDto) {
    const data: UserEntity = new UserEntity();
    data.userName = query.userName;
    data.userID = query.userID;
    data.userPW = query.userPW;

    const result: UserEntity = await this.userEntity.save(data);
    console.log(result);
    return '축하합니다! 회원가입에 성공하였습니다.:)';
  }
  async login(query: UserLoginDto) {
    const data: UserEntity = await this.userEntity.findOne({
      where: {
        userID: query.userID,
        userPW: query.userPW,
      },
    });
    if (!data) throw new NotFoundException('옳지 않은 회원정보입니다.');
    console.log(data); //로그인 성공시 토큰 발급
    const payload = {
      id: data.id.toString(),
    };
    const secretA = '0000';
    const secretR = '1234';
    const refresh = this.jwtService.sign(payload, {
      secret: secretR,
      expiresIn: '1h',
    });
    const access = this.jwtService.sign(payload, {
      secret: secretA,
      expiresIn: '10s',
    });
    return [access, refresh];
  }
  async update(query: UserUpdateDto) {
    const data: UserEntity = await this.userEntity.findOne({
      where: {
        userName: query.userName,
      },
    });
    if (!data) {
      throw new NotFoundException('등록되어있지 않은 회원정보 입니다.');
    }
    await this.userEntity.update(
      { userName: query.userName },
      { userID: query.userID, userPW: query.userPW },
    );
    const updatedata: UserUpdateDto = await this.userEntity.findOne({
      where: {
        userName: data.userName,
      },
    });
    return `${updatedata.userName}님의 회원정보가 변경되었습니다!`;
  }
  async delete(query: UserDeleteDto) {
    const user = await this.userEntity.findOne({
      where: {
        userName: query.userName,
        userID: query.userID,
        userPW: query.userPW,
      },
    });
    if (!user) throw new NotFoundException('저장되어있지 않은 회원정보입니다.');
    const product = await this.productEntity
      .createQueryBuilder('product_entity')
      .delete()
      .where('userID = :userID', { userID: user.id })
      .execute();
    console.log(product);
    await this.userEntity.delete(user);
    return '회원탈퇴 되었습니다.';
  }
}
