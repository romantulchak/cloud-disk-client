import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute} from '@angular/router';
import { FileDTO } from '../dto/file.dto';
import { FolderDTO } from '../dto/folder.dto';
import { Context } from '../model/context.model';
import { ContextEnum } from '../model/enum/context.enum';
import { DriveService } from '../service/drive.service';
import { FolderService } from '../service/folder.service';

@Component({
  selector: 'app-folder-details',
  templateUrl: './folder-details.component.html',
  styleUrls: ['./folder-details.component.scss'],
})
export class FolderDetailsComponent implements OnInit, OnDestroy {

  private folderLink: string;
  public folders: MatTableDataSource<FolderDTO | FileDTO> = new MatTableDataSource();

  constructor(private driveService: DriveService,
              private folderService: FolderService,
              private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.getSubFolders();
    this.updateFolders();
  }

  private getSubFolders(){
    this.activatedRouter.params.subscribe(
      res=>{
        this.folderLink = res.link;
        this.initContext();
        this.getSubFoldersInFolder();
      }
    );
  }

  private updateFolders(){
    this.folderService.folderSubject.subscribe(
      res=>{
        if(res != null){
          this.folders.data.push(res);
          this.folders.data = this.folders.data;
        }
      }
    );
  }

  private initContext(){
    let context = new Context(ContextEnum.FOLDER, this.folderLink);
    this.driveService.contextSubject.next(context);
  }

  private getSubFoldersInFolder(){
    this.folderService.findSubFoldersInFolder(this.folderLink).subscribe(
      res=>{
        console.log(res);
        
        this.folders.data = res;
      }
    );
  }

  ngOnDestroy(): void{
    this.folders.data = [];
  }
} 
