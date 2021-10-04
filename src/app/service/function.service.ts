import { HttpEventType, HttpResponse } from "@angular/common/http";
import {Injectable} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateFolderDialogComponent} from "../create-folder-dialog/create-folder-dialog.component";
import { Context } from "../model/context.model";
import { ContextEnum } from "../model/enum/context.enum";
import { UploadDialogComponent } from "../upload-dialog/upload-dialog.component";
import { FileService } from "./file.service";
import { FolderService } from "./folder.service";

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  private files: FileList;
  private uploaderDialog:MatDialogRef<any, any>;

  constructor(private dialog: MatDialog,
              private folderService: FolderService,
              private fileService: FileService) {}

  public createFolder() {
    this.dialog.open(CreateFolderDialogComponent, {
      panelClass: 'create__folder_container',
    });
  }

  public uploadFiles(event: any, context: Context){
    this.files = event.target.files;
    this.openUploadDialog();
    this.uploaderDialog = this.dialog.getDialogById('upload_dialog_num');

    if(context.context == ContextEnum.DRIVE){

    }else{
      for (let index = 0; index < this.files.length; index++) {
      this.upload(context, this.files[index], index);
      }
    }
  }

  private upload(context: Context, file: File, index: number){
    let obj = {
      file: file,
      value: 0
    };
    this.uploaderDialog.componentInstance.progressInfos.push(obj);
    
    if(file){
      this.fileService.uploadFiles(file, context.data).subscribe(
        (event: any)=>{
          if (event.type === HttpEventType.UploadProgress) {
            this.uploaderDialog.componentInstance.progressInfos[index].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.folderService.folderSubject.next(event.body);

          }
            
        }
      );
    }
  }

  private openUploadDialog(){
    let uploadDialog = this.dialog.getDialogById('upload_dialog_num');
    if(!uploadDialog){
      this.dialog.open(UploadDialogComponent, 
        {
          disableClose: true,
          panelClass:'upload__dialog',
          id: 'upload_dialog_num',
          data: []
      });
    }else{
      this.uploaderDialog.componentInstance.progressInfos = [];
    }

  }
}
