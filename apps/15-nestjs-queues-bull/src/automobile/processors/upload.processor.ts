import { Process, Processor } from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { Vehicle } from '../../automobile/vehicle';
import { Repository } from 'typeorm';

@Processor('upload-queue')
export class UploadProcessor {
  // job handler here for all CPU intensive tasks
  constructor(
    @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>,
  ) {}

  /**
   * process csv file
   * @param job
   * @returns
   */
  @Process('csv')
  async handleCsvFiles(job: Job) {
    console.log(job);

    try {
      const csv = require('csvtojson');
      const csvFilePath = process.cwd() + '/' + job.data.file.path;
      console.log(csvFilePath);
      const vehicleArray = await csv().fromFile(csvFilePath);
      console.log(vehicleArray);

      await this.vehicleRepository.save(vehicleArray);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
