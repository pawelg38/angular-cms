import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postTransform'
})
export class PostTransformPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.substr(0, 250) + '...';
  }

}
