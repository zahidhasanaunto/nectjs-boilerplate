import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  QueryParams
} from 'routing-controllers';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { UserInfo } from './../../../db/entities/user/userInfo.entity';
import { UserInfoRepository } from '../../../db/repositories/user/userInfo.repository';

@JsonController('/userInfos')
// @Authorized()
export class UserInfoController {
  public static ENTITY: string = 'UserInfo';

  private relations: string[] = [];

  constructor(@InjectRepository() private repository: UserInfoRepository) { }

  @Get('/')
  public async all(@QueryParams() queryParams: any) {
    return this.repository.getDataAll(queryParams, this.relations);
  }

  @Get('/:uuid')
  public async byId(@Param('uuid') uuid: string) {
    return this.repository.getDataById(uuid, this.relations);
  }

  @Post('/')
  public async create(@Body() body: UserInfo) {
    return this.repository.insertData(body);
  }

  @Put('/:uuid')
  public async updateById(@Param('uuid') uuid: string, @Body() body: any) {
    return this.repository.updateData(uuid, body);
  }

  @Delete('/:uuid')
  public async deleteById(@Param('uuid') uuid: string) {
    return this.repository.deleteData(uuid);
  }
}
