import { Component, OnInit } from '@angular/core';
import { Context } from '../model/context.model';
import { ContextEnum } from '../model/enum/context.enum';
import { ContextType } from '../model/enum/contextType.enum';
import { DriveService } from '../service/drive.service';
import { FunctionService } from '../service/function.service';

@Component({
  selector: 'app-folder-toolbar',
  templateUrl: './folder-toolbar.component.html',
  styleUrls: ['./folder-toolbar.component.scss']
})
export class FolderToolbarComponent implements OnInit {

  public context: Context;
  public contextType = ContextEnum;

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
