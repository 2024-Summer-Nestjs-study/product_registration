import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../Entity/user.entity';
import { Repository } from 'typeorm';
import { UserRegistDto } from '../userDto/user.regist.dto';
import { UserLoginDto } from '../userDto/user.login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
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
    console.log(data);
    return `${data.userName}님 환영합니다!`;
  }
}
