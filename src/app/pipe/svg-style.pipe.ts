import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'svgStyle'
})
export class SvgStylePipe implements PipeTransform {

  private readonly defaultColor: string = "rgb(95, 99, 104)";

  transform(value: string, ...args: unknown[]): string {
    if(value === undefined || value.length === 0){
      return this.defaultColor;
    }
    return value.replace(';', '');
  }

}
