import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Types } from 'mongoose';

@Injectable()
export class IdParamInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;
    const { id } = params;

    if (request.params?.id && !Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Wrong ID format');
    }

    return next.handle().pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
