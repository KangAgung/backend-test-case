import { Member } from './member.entity';

export interface MemberRepository {
  getAllMembers(): Promise<any[]>;
  findByCode(code: string): Promise<Member | undefined>;
  save(member: Member): Promise<Member>;
}
