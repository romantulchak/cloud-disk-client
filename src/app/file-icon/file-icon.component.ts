import { Component, Input, OnInit } from '@angular/core';
import { FileType } from '../model/enum/fileType.enum';

@Component({
  selector: 'app-file-icon',
  templateUrl: './file-icon.component.html',
  styleUrls: ['./file-icon.component.scss']
})
export class FileIconComponent implements OnInit {

  @Input("extension") extension: string;
  @Input("path") path: string;

  public fileType: FileType = new FileType();

  constructor() { }

  ngOnInit(): void {
  }

}
