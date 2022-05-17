import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileDTO } from '../dto/file.dto';
import { FileType } from '../model/enum/fileType.enum';
import { FileExtensionPipe } from '../pipe/file-extension.pipe';

@Component({
  selector: 'app-file-preview-dialog',
  templateUrl: './file-preview-dialog.component.html',
  styleUrls: ['./file-preview-dialog.component.scss']
})
export class FilePreviewDialogComponent implements OnInit {

  public fileExtension: string;
  constructor(@Inject(MAT_DIALOG_DATA) public file: FileDTO) { }

  ngOnInit(): void {
    this.fileExtension = new FileExtensionPipe().transform(this.file.name);
    const fileType = new FileType();

    if(fileType.IMG.includes(this.fileExtension)){
      this.fileExtension = 'img';
    }else if(fileType.MP4.includes(this.fileExtension)){
      this.fileExtension = 'video';
    }
  }

}
