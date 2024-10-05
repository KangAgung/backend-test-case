import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { CheckMemberUseCase } from './useCases/checkMemberUseCase';
import { MembersResponse } from './dto/member.dto';

@Controller('members')
@ApiTags('Members')
export class MemberController {
  constructor(private readonly checkMemberUseCase: CheckMemberUseCase) {}

  @Get()
  @ApiOperation({
    summary: 'List all members',
  })
  @ApiOkResponse({
    type: MembersResponse,
  })
  async getMembers(): Promise<MembersResponse> {
    try {
      return await this.checkMemberUseCase.execute();
    } catch (error) {
      console.error('Error has been occured:', error);
      throw new InternalServerErrorException({
        status: 500,
        message: 'internal server error',
      });
    }
  }
}
