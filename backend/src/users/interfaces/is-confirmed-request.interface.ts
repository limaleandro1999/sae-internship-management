import { Request } from 'express';

type Params = {
  confirmationId: string;
};

export interface IsConfirmedRequest extends Request {
  params: Params;
}
