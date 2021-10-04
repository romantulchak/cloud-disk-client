import { Component, OnInit } from '@angular/core';
import { Context } from '../model/context.model';
import { DriveService } from '../service/drive.service';
import { FunctionService } from '../service/function.service';

@Component({
  selector: 'app-folder-toolbar',
  templateUrl: './folder-toolbar.component.html',
  styleUrls: ['./folder-toolbar.component.scss']
})
export class FolderToolbarComponent implements OnInit {

  public context: Context;

  constructor(public functionService: FunctionService,
              private driveService: DriveService) { }

  ngOnInit(): void {
    this.driveService.contextSubject.subscribe(
      res=>{
        this.context = res;
      }
    );
  }

  public changeGrid(){

  }
}
