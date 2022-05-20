import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Uploader} from '../../../model/uploader.model';

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

  }

  public getTotalElements(): number {
    return this.progressInfos.map(element => element.totalElements).reduce((sum, current) => sum + current);
  }

}
