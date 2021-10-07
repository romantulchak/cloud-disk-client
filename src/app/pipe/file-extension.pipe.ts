import { Pipe, PipeTransform } from '@angular/core';
import { FileDTO } from '../dto/file.dto';
import { FolderDTO } from '../dto/folder.dto';

@Pipe({
  name: 'fileExtension'
})
export class FileExtensionPipe implements PipeTransform {

  transform(value: FolderDTO | FileDTO | File, ...args: unknown[]): string {
    let index = value.name.lastIndexOf(".") + 1;
    return value.name.slice(index);
  }

}
