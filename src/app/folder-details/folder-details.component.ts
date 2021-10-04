import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
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
export class FolderDetailsComponent implements OnInit {

  private folderLink: string;
  public folders: FolderDTO[];

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
          this.folders?.push(res);
          if(this.folders != null){
            this.folders = [...this.folders];
          }
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
        this.folders = res;
      }
    );
  }
} 
