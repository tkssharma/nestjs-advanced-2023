import { Controller, Get, Param } from '@nestjs/common';
import { ParsePokemonIdPipe } from './parse-pokemon-id.pipe';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get(':id')
  getPokemon(@Param('id', ParsePokemonIdPipe) id: number) {
    return this.pokemonService.getPokemon(id);
  }
}
