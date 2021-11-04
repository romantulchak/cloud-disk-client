import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-header-upload-download',
  templateUrl: './dialog-header-upload-download.component.html',
  styleUrls: ['./dialog-header-upload-download.component.scss']
})
export class DialogHeaderUploadDownloadComponent implements OnInit {

  @Input("numberOfElements") numberOfElements: number = 9;
  @Input("action") action: string;

  constructor() { }

  ngOnInit(): void {
  }

}
