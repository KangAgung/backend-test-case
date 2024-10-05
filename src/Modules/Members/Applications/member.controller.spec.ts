import { Test, TestingModule } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { CheckMemberUseCase } from './useCases/checkMemberUseCase';
import { MembersResponse } from './dto/member.dto';

describe('MemberController', () => {
  let controller: MemberController;
  let checkMemberUseCase: CheckMemberUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [
        {
          provide: CheckMemberUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MemberController>(MemberController);
    checkMemberUseCase = module.get<CheckMemberUseCase>(CheckMemberUseCase);
  });

  it('should show all members', async () => {
    const expectedMembers: MembersResponse = {
      message: 'List all members',
      data: [
        {
          id: 1,
          code: '123',
          name: 'asep',
          borrowedBooks: [],
          penaltyEndDate: null,
        },
      ],
    };

    jest
      .spyOn(checkMemberUseCase, 'execute')
      .mockResolvedValue(expectedMembers);

    const result = await controller.getMembers();

    expect(result).toEqual(expectedMembers);
    expect(checkMemberUseCase.execute).toHaveBeenCalledTimes(1);
  });
});
