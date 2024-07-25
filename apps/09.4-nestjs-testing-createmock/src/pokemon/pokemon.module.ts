import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';

@Module({
  imports: [HttpModule],
  providers: [PokemonService],
  controllers: [PokemonController],
})
export class PokemonModule {}
