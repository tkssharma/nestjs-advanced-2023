import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class PokemonService {
  constructor(private httpService: HttpService) {}

  async getPokemon(id: number): Promise<string> {
    if (id < 1 || id > 151) {
      throw new BadRequestException(`Invalid Pokemon ID`);
    }

    const { data } = await this.httpService.axiosRef({
      url: `https://pokeapi.co/api/v2/pokemon/${id}`,
      method: `GET`,
    });

    if (!data || !data.species || !data.species.name) {
      throw new InternalServerErrorException();
    }

    return data.species.name;
  }
}
