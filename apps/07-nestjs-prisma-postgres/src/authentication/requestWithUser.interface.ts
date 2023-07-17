import { Request } from 'express';
import { User } from '@prisma/client';

interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
