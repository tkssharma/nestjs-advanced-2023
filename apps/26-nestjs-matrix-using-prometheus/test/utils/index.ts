import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../src/db/db.service';

import * as fs from 'fs';
import * as Path from 'path';

@Injectable()
export class TestUtils {
  public databaseService: DatabaseService;
  constructor(databaseService: DatabaseService) {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error('ERROR-TEST-UTILS-ONLY-FOR-TESTS');
    }
    this.databaseService = databaseService;
  }
  public async close() {
    await this.databaseService.close();
  }
  public async getEntities() {
    const entities: any = [];
    (await this.databaseService.getAllRepository()).forEach((x) =>
      entities.push({ name: x.name, tableName: x.tableName }),
    );
    return entities;
  }

  public async getRandomUser(token: string) {
    return { user_id: '' };
  }
  public async reloadFixtures() {
    try {
      const entities = await this.getEntities();
      await this.cleanAll(entities);
      // clean all db tables
      await this.loadAll(entities);
      // load fixtures if any
    } catch (err) {
      throw err;
    }
  }

  public async cleanAll(entities: any) {
    try {
      for (const entity of entities) {
        const repository = await this.databaseService.getRepository(
          entity.name,
        );
        await repository.query(`truncate  table  ${entity.tableName} CASCADE`);
      }
    } catch (error) {
      throw new Error(`ERROR: Cleaning test db: ${error}`);
    }
  }

  public async loadAll(entities: any) {
    try {
      for (const entity of entities) {
        const repository = await this.databaseService.getRepository(
          entity.name,
        );
        const fixtureFile = Path.join(
          __dirname,
          `../fixtures/entity/${entity.name}.json`,
        );
        if (fs.existsSync(fixtureFile)) {
          const items = JSON.parse(fs.readFileSync(fixtureFile, 'utf8'));
          await repository
            .createQueryBuilder(entity.name)
            .insert()
            .values(items)
            .execute();
        }
      }
    } catch (error) {
      throw new Error(
        `ERROR [TestUtils.loadAll()]: Loading fixtures on test db: ${error}`,
      );
    }
  }
}
