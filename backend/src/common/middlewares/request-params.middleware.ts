import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { RequestWithQueryInfo } from '../interfaces/request-query-info.interface';

@Injectable()
export class RequestParamsMiddleware implements NestMiddleware {
  use(req: RequestWithQueryInfo, _res: Response, next: Function) {
    let { range, filter, sort } = req.query;

    range = range ? JSON.parse(<string>range) : null;
    sort = sort ? JSON.parse(<string>sort) : null;
  
    req.queryInfo = {};

    req.queryInfo.skip = range ? range[0] : null;
    req.queryInfo.take = range ? range[1] - range[0]: null;
    req.queryInfo.order = sort ? { [sort[0]]: sort[1] } : null;
    req.queryInfo.filter = filter ? JSON.parse(<string>filter) : null;
    
    next();
  }
}