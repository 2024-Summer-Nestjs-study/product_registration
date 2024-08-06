import { Column, Entity } from 'typeorm';
import { DefaultEntity } from './default.entity';

@Entity()
export class UserEntity extends DefaultEntity {
  @Column()
  userName: string;
  @Column()
  userID: string;
  @Column()
  userPW: string;
}
