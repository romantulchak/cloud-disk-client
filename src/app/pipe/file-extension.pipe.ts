import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'fileExtension'
})
export class FileExtensionPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let index = value.lastIndexOf(".") + 1;
    return value.slice(index);
  }

}
