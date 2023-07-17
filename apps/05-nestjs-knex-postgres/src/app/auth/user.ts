import { Request } from 'express';
export interface UserMetaData {
  user_id: string;
  roles?: string[];
}
export interface RequestModel extends Request {
  user: UserMetaData;
}
