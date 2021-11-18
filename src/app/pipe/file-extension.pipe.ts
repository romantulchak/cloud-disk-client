import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'fileExtension'
})
export class FileExtensionPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if(value === null || value?.length === 0){
      return "";
    }
    let index = value.lastIndexOf(".") + 1;
    return value.slice(index);
  }

}
