import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from './Infrastructures/member.entity';
import { MemberRepositoryImpl } from './Infrastructures/member.repository.impl';
import { CheckMemberUseCase } from './Applications/useCases/checkMemberUseCase';
import { MemberController } from './Applications/member.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MemberEntity])],
  controllers: [MemberController],
  providers: [
    CheckMemberUseCase,
    {
      provide: 'MemberRepository',
      useClass: MemberRepositoryImpl,
    },
  ],
})
export class MemberModule {}
