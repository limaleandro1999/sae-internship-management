import { Request } from 'express';
import { BaseFilter } from './base-filter-interface';

type QueryInfo = { order?, filter?: BaseFilter, skip?: number, take?: number };

export interface RequestWithQueryInfo extends Request {
  queryInfo: QueryInfo;
}