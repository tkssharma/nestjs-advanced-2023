import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityMetadata, Repository } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(private dataSource: DataSource) {}
  public async getRepository<T>(entity: any): Promise<Repository<T>> {
    return this.dataSource.getRepository(entity);
  }
  public async getAllRepository<T>(): Promise<EntityMetadata[]> {
    return await this.dataSource.entityMetadatas;
  }
  public async close<T>(): Promise<void> {
    await this.dataSource.destroy();
  }
}
