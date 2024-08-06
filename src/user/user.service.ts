import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../Entity/user.entity';
import { Repository } from 'typeorm';
import { UserRegistDto } from '../userDto/user.regist.dto';

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
}
