import { Pipe, PipeTransform } from '@angular/core';
import { SizeType } from '../model/enum/sizeType.enum';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

  transform(size: number, ...args: unknown[]): string {

      if (size > SizeType.B_MIN && size < SizeType.B_MAX) {
        return this.convertBytes(size, SizeType.B_MIN) + " B";
      } else if (size > SizeType.KB_MIN && size < SizeType.KB_MAX) {
        return this.convertBytes(size, SizeType.KB_MIN) + " KB";
      } else if (size > SizeType.MB_MIN && size < SizeType.MB_MAX) {
        return this.convertBytes(size, SizeType.MB_MIN) + " MB";
      } else if (size > SizeType.GB_MIN && size < SizeType.GB_MAX) {
        return this.convertBytes(size, SizeType.GB_MIN) + " GB";
      }
      return "";
  }
  
  private convertBytes(size: number, divied: number): string {
    return (size / divied).toPrecision(3);
  }

}
