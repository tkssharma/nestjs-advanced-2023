import { Injectable } from '@nestjs/common';

@Injectable()
export default class AuthService {
  init(auth: string) {
    return { user_id: '' };
  }
}
