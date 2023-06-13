import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ChangeStringPipe implements PipeTransform {
  // ============== value คือ body เอาไว้ transform data ต่างๆ ==============
  transform(value: any, metadata: ArgumentMetadata) {
    // console.log('from pipe', value);

    return value;
  }
}
