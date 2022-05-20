import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Download} from '../../../model/download.model';
import {ContextType} from '../../../model/enum/contextType.enum';

@Component({
  selector: 'app-download-dialog',
  templateUrl: './download-dialog.component.html',
  styleUrls: ['./download-dialog.component.scss']
})
export class DownloadDialogComponent implements OnInit {

  public contextType = ContextType;


  constructor(@Inject(MAT_DIALOG_DATA) public progressInfos: Download[]) {
  }

  ngOnInit(): void {
  }

}
