import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { RequestWithQueryInfo } from '../interfaces/request-query-info.interface';

@Injectable()
export class RequestParamsMiddleware implements NestMiddleware {
  use(req: RequestWithQueryInfo, _res: Response, next: NextFunction) {
    const { filter } = req.query;
    let { range, sort } = req.query;

    range = range ? JSON.parse(<string>range) : null;
    sort = sort ? JSON.parse(<string>sort) : null;

    req.queryInfo = {};

    req.queryInfo.skip = range ? range[0] : 0;
    req.queryInfo.take = range ? range[1] - range[0] + 1 : null;
    req.queryInfo.order = sort ? { [sort[0]]: sort[1] } : { id: 'ASC' };
    req.queryInfo.filter = filter ? JSON.parse(<string>filter) : { q: null };

    next();
  }
}
