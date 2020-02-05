import { ObjectLiteral, Repository, FindManyOptions } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import {
  getSingleDataPlaceholder,
  insertDataPlaceholder,
  paginate,
  paginationOptions,
  updateDataPlaceholder,
  deleteDataPlaceholder,
  paginateAll
} from '../../../utils';

export class BaseRepository<Entity extends ObjectLiteral> extends Repository<
  Entity
  > {
  constructor() {
    super();
    // this.cl;
  }

  public async getDataAll(
    options: any,
    relations?: string[]
  ): Promise<any | undefined> {

    if (options.take && options.take === 'all') {
      delete options.take;
      delete options.page;
      options.where = { ...options };
      options.relations = relations;

      const payload = await this.find(options);
      return paginateAll(payload);
    } else {
      const pOptions: any = paginationOptions(options);
      pOptions.where = { ...options };

      if (relations) {
        pOptions.relations = relations;
      }

      const payload = await this.findAndCount(pOptions);
      return paginate(pOptions, payload);
    }
  }

  public async getDataById(
    uuid: any,
    relations?: string[]
  ): Promise<any | undefined> {
    const options: FindManyOptions = {};
    if (relations) {
      options.relations = relations;
    }
    const payload = await this.findByIds([uuid], options);
    return getSingleDataPlaceholder(payload);
  }

  public async insertData(options: any): Promise<any | undefined> {
    const payload = await this.save(options);
    return insertDataPlaceholder(payload);
  }

  public async updateData(
    uuid: string,
    options: QueryDeepPartialEntity<Entity>
  ): Promise<any | undefined> {
    const _payload = await this.update(uuid, options);
    const payload = await this.findByIds([uuid]);
    return updateDataPlaceholder(payload);
  }

  public async deleteData(uuid: string): Promise<any | undefined> {
    const payload = await this.delete(uuid);
    return deleteDataPlaceholder(payload);
  }
}
