import { Injectable } from '@nestjs/common';
import { Vehicle } from './vehicle';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AutomobileService {
  constructor(
    @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>,
  ) {}

  async saveFile(file: any): Promise<string[]> {
    const csv = require('csvtojson');
    const csvFilePath = process.cwd() + '/' + file.path;

    const vehicleArray = await csv().fromFile(csvFilePath);
    var vehicles;

    try {
      vehicles = await this.vehicleRepository.save(vehicleArray);
    } catch (error) {
      vehicles = null;
    }
    return vehicles;
  }
}
