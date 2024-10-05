import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('member')
export class MemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column('text', { name: 'borrowed_books', nullable: true, array: true })
  borrowedBooks: string[] = [];

  @Column({ name: 'penalty_end_date', nullable: true, type: 'timestamp' })
  penaltyEndDate?: Date;
}
