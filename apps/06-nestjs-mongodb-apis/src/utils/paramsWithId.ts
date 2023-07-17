import { IsMongoId } from 'class-validator';

class ParamsWithId {
  @IsMongoId()
  id: string;
}

export default ParamsWithId;
