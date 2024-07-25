import { BadRequestException } from '@nestjs/common';
import { ParsePokemonIdPipe } from './parse-pokemon-id.pipe';

describe('ParsePokemonIdPipe', () => {
  let pipe: ParsePokemonIdPipe;

  beforeEach(() => {
    pipe = new ParsePokemonIdPipe();
  });

  it('should be defined', () => {
    expect(new ParsePokemonIdPipe()).toBeDefined();
  });

  it(`should throw error for non numbers`, () => {
    const value = () => pipe.transform(`hello`);
    expect(value).toThrowError(BadRequestException);
  });

  it(`should throw error if number less than 1`, () => {
    const value = () => pipe.transform(`-34`);
    expect(value).toThrowError(BadRequestException);
  });

  it(`should throw error if number greater than 151`, () => {
    const value = () => pipe.transform(`200`);
    expect(value).toThrowError(BadRequestException);
  });

  it(`should return number if between 1 and 151`, () => {
    const value = () => pipe.transform(`5`);
    expect(value()).toBe(5);
  });
});
