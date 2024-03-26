import { Request } from 'express';
import { JWTPayload } from '../../auth/auth.interface';

export interface RequestWithCurrentUser extends Request {
  user: JWTPayload;
  isAdmin: boolean;
}
