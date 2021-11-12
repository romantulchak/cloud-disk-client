import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'svgStyle'
})
export class SvgStylePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.replace(';', '');
  }

}
