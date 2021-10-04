import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit, OnChanges {

  public files: File[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public progressInfos: any) { 
    
  }

  ngOnInit(): void {
    // this.progressInfos.forEach(element => {
    //   this.files.push(element.file);
    // });
    
  }

  ngOnChanges(){

  }


  public getExtension(file: File): string{
    let index = file.name.lastIndexOf(".") + 1;
    return file.name.slice(index);
  }

}
