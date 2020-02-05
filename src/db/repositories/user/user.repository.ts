import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../base/base.repository';
import { User } from '../../entities/user/user.entity';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {
  constructor() {
    super();
  }

  public async checkUser(options: any): Promise<any | undefined> {
    return this.find(options);
  }
}
