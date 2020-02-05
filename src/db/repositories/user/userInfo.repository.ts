import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../base/base.repository';
import { UserInfo } from '../../entities/user/userInfo.entity';

@EntityRepository(UserInfo)
export class UserInfoRepository extends BaseRepository<UserInfo> {
  constructor() {
    super();
  }
}
