import { Pipe, PipeTransform } from '@angular/core';
import { FileDTO } from '../dto/file.dto';
import { FolderDTO } from '../dto/folder.dto';

@Pipe({
  name: 'fileExtension'
})
export class FileExtensionPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let index = value.lastIndexOf(".") + 1;
    return value.slice(index);
  }

}
