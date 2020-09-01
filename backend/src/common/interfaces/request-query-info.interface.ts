import { Request } from 'express';

type QueryInfo = { order?, filter?, skip?: number, take?: number };

export interface RequestWithQueryInfo extends Request {
  queryInfo: QueryInfo;
}