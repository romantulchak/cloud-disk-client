import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FolderDTO } from '../dto/folder.dto';
import { Context } from '../model/context.model';
import { ContextEnum } from '../model/enum/context.enum';
import { GridStyle } from '../model/enum/gridStyle.enum';
import { DriveService } from '../service/drive.service';
import { FolderService } from '../service/folder.service';

@Component({
  selector: 'app-my-disk',
  templateUrl: './my-disk.component.html',
  styleUrls: ['./my-disk.component.scss']
})
export class MyDiskComponent implements OnInit {

  constructor(private driveService: DriveService,
              private folderSerivce: FolderService,
              private router: Router) { }

  private driveName: string;
  public folders: FolderDTO[];

  public gridStyle = GridStyle;
  public style: string;
  
  ngOnInit(): void {
    this.getUserDrive();
    this.updateFolders();
  }

  private initContext(){
    let context = new Context(ContextEnum.DRIVE, this.driveName);
    this.driveService.contextSubject.next(context);
  }

  public updateFolders(){
    this,this.folderSerivce.folderSubject.subscribe(
      res=>{
        if(res != null){
          this.folders?.push(res);
          if(this.folders != null){
            this.folders = [...this.folders];
          }
        }
      }
    );
  }

  private getUserDrive(){
    this.driveService.getDrive().then(res=>{
      this.driveName = res;
      this.getFolders();
      this.initContext();
    });
  }

  private getFolders(){
    this.folderSerivce.findAllElementsForDrive(this.driveName).subscribe(
      res=>{
        this.folders = res as FolderDTO[];
      }
    );
  }

} 
