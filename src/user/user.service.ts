import {
  Injectable,
  Logger,
  NotFoundException,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../Entity/user.entity';
import { Repository } from 'typeorm';
import { UserRegistDto } from './userDto/user.regist.dto';
import { UserLoginDto } from './userDto/user.login.dto';
import { UserUpdateDto } from './userDto/user.update.dto';
import { UserDeleteDto } from './userDto/user.delete.dto';
import { ProductEntity } from '../Entity/product.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(ProductEntity)
    private readonly productEntity: Repository<ProductEntity>,
  ) {}
  async regist(body: UserRegistDto) {
    const data: UserEntity = new UserEntity();
    data.userName = body.userName;
    data.userID = body.userID;
    data.userPW = await bcrypt.hash(body.userPW, 10);

    const result: UserEntity = await this.userEntity.save(data);
    console.log(result);
    this.logger.debug('🥳Logging...');
    return '축하합니다! 회원가입에 성공하였습니다.:)';
  }
  async login(query: UserLoginDto) {
    const data: UserEntity = await this.userEntity.findOne({
      where: {
        userID: query.userID,
      },
    });
    if (!data) {
      this.logger.error('☠️Logging...');
      throw new NotFoundException('ID가 틀렸습니다.');
    }
    const validatePassword = await bcrypt.compare(query.userPW, data.userPW);
    if (validatePassword === false) {
      this.logger.error('☠️Logging...');
      throw new UnauthorizedException('PW가 틀렸습니다.');
    }
    console.log(data); //로그인 성공시 토큰 발급
    const payload = {
      id: data.id.toString(),
      userName: data.userName.toString(),
    };
    const secretA = this.configService.get('access_Key');
    const secretR = this.configService.get('refresh_Key');
    const refreshToken = this.jwtService.sign(payload, {
      secret: secretR,
      expiresIn: '1h',
    });
    const accessToken = this.jwtService.sign(payload, {
      secret: secretA,
      expiresIn: '100s',
    });
    return (
      'accessToken : ' +
      [accessToken] +
      '\n' +
      'refreshToken : ' +
      [refreshToken]
    );
  }
  async update(query: UserUpdateDto, @Request() req: Request) {
    const data: UserEntity = await this.userEntity.findOne({
      where: {
        userName: req['user'].userName,
      },
    });
    if (!data) {
      this.logger.error('☠️Logging...');
      throw new NotFoundException('등록되어있지 않은 회원정보 입니다.');
    }
    await this.userEntity.update(
      { userName: req['user'].userName },
      { userID: query.userID, userPW: query.userPW },
    );
    const updatedata = await this.userEntity.findOne({
      where: {
        userName: req['user'].userName,
      },
    });
    return `${updatedata.userName}님의 회원정보가 변경되었습니다!`;
  }
  async delete(query: UserDeleteDto, @Request() req: Request) {
    const user = await this.userEntity.findOne({
      where: {
        userName: req['user'].userName,
        userID: req['user'].userID,
        userPW: req['user'].userPW,
      },
    });
    if (!user) {
      this.logger.error('☠️Logging...');
      throw new NotFoundException('저장되어있지 않은 회원정보입니다.');
    }
    const product = await this.productEntity
      .createQueryBuilder('product_entity')
      .delete()
      .where('userID = :userID', { userID: user.id })
      .execute();
    console.log(product);
    await this.userEntity.delete(user);
    return '회원탈퇴 되었습니다.';
  }
  async getAccess(@Request() req: Request) {
    const newpayload = {
      id: req['user'].id,
    };
    const secretA = this.configService.get('access_Key');
    const newaccess = await this.jwtService.sign(newpayload, {
      secret: secretA,
      expiresIn: '100s',
    });
    return newaccess;
  }
}
