import { MemberEntity as Member } from '../../Infrastructures/member.entity';

export class MemberResponse {
  message: string = 'success';
  data: Member;
}

export class MembersResponse {
  message: string = 'success';
  data: Member[];
}
