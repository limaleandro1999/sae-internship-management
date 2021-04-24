import { Request } from 'express';
import { BaseFilter } from './base-filter-interface';

type QueryInfo = { order?; filter?: BaseFilter; skip?: number; take?: number };

interface User extends Express.User {
  campusId: number;
  email: string;
}
export interface RequestWithQueryInfo extends Request {
  queryInfo: QueryInfo;
  user: User;
}
