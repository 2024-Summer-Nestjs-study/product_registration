import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { UserEntity } from './user.entity';

@Entity()
export class ProductEntity extends DefaultEntity {
  @ManyToOne((type) => UserEntity, (user: UserEntity) => user.id)
  @JoinColumn()
  user: UserEntity;
  @Column()
  name: string;
  @Column()
  price: number;
}
