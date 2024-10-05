import { Inject } from '@nestjs/common';
import { MemberRepository } from '../../domain/member.repository';
import { MembersResponse } from '../dto/member.dto';

export class CheckMemberUseCase {
  constructor(
    @Inject('MemberRepository')
    private readonly memberRepository: MemberRepository,
  ) {}

  async execute(): Promise<MembersResponse> {
    try {
      const members = await this.memberRepository.getAllMembers();

      return {
        message: 'List all members',
        data: members.map((item) => ({
          ...item,
          totalBorrowedBooks: item.borrowedBooks.length,
        })),
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
