import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContextType } from '../model/enum/contextType.enum';
import { Folder } from '../model/folder.model';
import { Uploader } from '../model/uploader.model';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit {

  public totalElements: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public progressInfos: Uploader[]) { 
  }

  ngOnInit(): void {
    this.progressInfos.forEach(element => {
      this.totalElements++;
      if(element.value === 100){
        this.totalElements++;
      }
    })
  }
}
