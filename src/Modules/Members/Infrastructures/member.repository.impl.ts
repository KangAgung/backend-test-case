import { Injectable } from '@nestjs/common';
import { MemberRepository } from '../Domain/member.repository';
import { Member } from '../Domain/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberEntity } from './member.entity';

@Injectable()
export class MemberRepositoryImpl implements MemberRepository {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly repository: Repository<MemberEntity>,
  ) {}

  async getAllMembers(): Promise<MemberEntity[]> {
    try {
      return await this.repository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByCode(code: string): Promise<Member | null> {
    try {
      const member = await this.repository.findOne({ where: { code } });
      if (!member) return null;

      const person = new Member(member.id, member.code, member.name);
      person.setBorrowedBooks(member.borrowedBooks);
      person.setPenaltyEndDate(member.penaltyEndDate);

      return person;
    } catch (error) {
      throw new Error(error);
    }
  }

  async save(member: Member): Promise<Member> {
    try {
      const memberOrm = new MemberEntity();

      memberOrm.id = member.id;
      memberOrm.code = member.code;
      memberOrm.name = member.name;
      memberOrm.borrowedBooks = member.getBorrowedBooks();
      memberOrm.penaltyEndDate = member.getPenaltyEndDate();

      await this.repository.save(memberOrm);

      return member;
    } catch (error) {
      throw new Error(error);
    }
  }
}
