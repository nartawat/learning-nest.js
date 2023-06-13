import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('todo')
export class TodoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'TITLE', length: 255 })
  title: string;

  @Column()
  subtitle: string;

  @UpdateDateColumn()
  created: Date;
}
