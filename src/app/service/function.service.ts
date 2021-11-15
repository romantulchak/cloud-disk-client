import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateFolderDialogComponent} from "../create-folder-dialog/create-folder-dialog.component";
import {FileDTO} from "../dto/file.dto";
import {Context} from "../model/context.model";
import {Download} from "../model/download.model";
import {ContextEnum} from "../model/enum/context.enum";
import {ContextType} from "../model/enum/contextType.enum";
import {Uploader} from "../model/uploader.model";
import {UploadDialogComponent} from "../upload-dialog/upload-dialog.component";
import {FileService} from "./file.service";
import {FolderService} from "./folder.service";
import {saveAs} from 'file-saver';
import {DownloadDialogComponent} from "../download-dialog/download-dialog.component";
import {MatTableDataSource} from "@angular/material/table";
import {FolderDTO} from "../dto/folder.dto";
import {ElementService} from "./element.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  private files: FileList;
  private uploaderDialog: MatDialogRef<any>;
  private downloadDialog: MatDialogRef<any>;
  private readonly ZIP_NAME_EXT = ".zip";
  private currentUrl: string;

  constructor(private dialog: MatDialog,
              private folderService: FolderService,
              private fileService: FileService,
              private elementService: ElementService,
              private router: Router) {
                this.currentUrl = router.url;
              }

  public createFolder(): void {
    this.dialog.open(CreateFolderDialogComponent, {
      panelClass: 'folder__file_container',
      id: 'createFolderId'
    });
  }

  public download(selectedElements: Download[]): void {
    this.openDownloadDialog();
    for (let index = 0; index < selectedElements.length; index++) {
      let element = selectedElements[index]
      this.downloadDialog.componentInstance.progressInfos.unshift(element);
      if (element.file.context === ContextType.FOLDER) {
        this.downloadFolder(element, index);
      } else {
        this.downloadFile(element, index);
      }
    }
  }

  private downloadFolder(element: Download, index: number): void {
    this.folderService.downloadFolder(element.file.link).subscribe(
      event => {
        this.getDownloadProgress(event, index, element.file.name);
      }
    );
  }

  private downloadFile(element: Download, index: number): void {
    this.fileService.downloadFile(element.file.link).subscribe(
      event => {
        this.getDownloadProgress(event, index, element.file.name);
      }
    );
  }

  private getDownloadProgress(event: any, index: number, filename: string): void {
    this.downloadDialog.componentInstance.progressInfos[index].type = event.type;
    if (event.type === HttpEventType.DownloadProgress) {
      this.downloadDialog.componentInstance.progressInfos[index].value = Math.round(100 * event.loaded / event.total);
    } else if (event instanceof HttpResponse) {
      let blob = new Blob([event.body]);
      let context = this.downloadDialog.componentInstance.progressInfos[index].file.context;
      this.saveFileDependsOnContext(blob, filename, context);
      setTimeout(() => {
        this.downloadDialog.componentInstance.progressInfos[index].downloaded = true;
      }, 500);
    }
  }

  public preRemove(selectedElements: FolderDTO[] | FileDTO[], driveName: string, source: MatTableDataSource<FolderDTO | FileDTO>): void {
    selectedElements.forEach(element => {
      this.elementService.preRemoveElement(element.link, driveName).subscribe(
        () => {
          source.data = source.data.filter(f => f.id !== element.id);
        }
      );
    });
  }

  public fullRemove(selectedElements: FolderDTO[] | FileDTO[], source: MatTableDataSource<FolderDTO | FileDTO>): void {
    selectedElements.forEach(element => {
      this.removeElement(element.link, source);
    });

  }

  private removeElement(fileLink: string, source: MatTableDataSource<FolderDTO | FileDTO>): void {
    this.elementService.removeElement(fileLink).subscribe(
      res => {
        source.data = source.data.filter(element => element.link !== fileLink);
      }
    );
  }

  public restore(selectedElements: FolderDTO[] | FileDTO[], source: MatTableDataSource<FolderDTO | FileDTO>): void {
    selectedElements.forEach(element => {
      this.restoreElement(element, source);
    });
  }

  private restoreElement(file: FileDTO, source: MatTableDataSource<FolderDTO | FileDTO>): void {
    this.elementService.restoreElement(file.link).subscribe(
      res => {
        source.data = source.data.filter(element => element.id != file.id);
      }
    );
  }

  //TODO: optimize this
  public uploadFiles(event: any, context: Context): void {
    this.files = event.target.files;
    this.openUploadDialog();
    if (context.context === ContextEnum.DRIVE) {
      for (let index = 0; index < this.files.length; index++) {
        this.uploadIntoDrive(context, this.files[index], index);
      }
    } else {
      for (let index = 0; index < this.files.length; index++) {
        this.uploadIntoFolder(context, this.files[index], index);
      }
    }
  }

  public uploadFolder(files: FileList, context: Context): void {
    this.openUploadDialog();
    let obj = new Uploader(null, 0, false, files.length);
    this.uploaderDialog.componentInstance.progressInfos.unshift(obj);
    let formData = new FormData();
    Array.from(files).forEach((file: File) => {
      formData.append("files", file)
    });
    if (context.context === ContextEnum.DRIVE) {
      formData.append("driveName", context.data);
      this.uploadFolderInDrive(formData);
    } else {
      formData.append("folderLink", context.data);
      this.uploadFolderInFolder(formData);
    }
  }

  private uploadFolderInDrive(formData: FormData): void {
    this.folderService.uploadInDrive(formData).subscribe(
      event => {
        this.getUploadingProgress(event, 0);
      },
      error => {
        this.uploaderDialog.componentInstance.progressInfos[0].error = {
          isError: true,
          message: error.error.message
        };
      }
    );
  }


  private uploadFolderInFolder(formData: FormData): void {
    this.folderService.uploadInFolder(formData).subscribe(
      event => {
        this.getUploadingProgress(event, 0);
      },
      error => {
        this.uploaderDialog.componentInstance.progressInfos[0].error = {
          isError: true,
          message: error.error.message
        };
      }
    );
  }

  private uploadIntoDrive(context: Context, file: File, index: number): void {
    let obj = new Uploader(file, 0, false);
    this.uploaderDialog.componentInstance.progressInfos.unshift(obj);    
    this.fileService.uploadFileIntoDrive(file, context.data).subscribe(
      event => {
        this.getUploadingProgress(event, index);
      },
      error => {
        this.uploaderDialog.componentInstance.progressInfos[index].error = {
          isError: true,
          message: error.error.message
        };
      }
    );
  }


  private uploadIntoFolder(context: Context, file: File, index: number): void {
    let obj = new Uploader(file, 0, false);
    this.uploaderDialog.componentInstance.progressInfos.unshift(obj);
    this.fileService.uploadFileIntoFolder(file, context.data).subscribe(
      event => {
        this.getUploadingProgress(event, index);
      },
      error => {
        this.uploaderDialog.componentInstance.progressInfos[index].error = {
          isError: true,
          message: error.error.message
        };
      }
    );
  }

  private getUploadingProgress(event: any, index: number): void {
    if (event.type === HttpEventType.UploadProgress) {
      this.uploaderDialog.componentInstance.progressInfos[index].value = Math.round(100 * event.loaded / event.total);
    } else if (event instanceof HttpResponse) {
      this.uploaderDialog.componentInstance.progressInfos[index].uploaded = true;
      event.body.isOwner = true;
      event.body.url = this.currentUrl;
      this.folderService.folderSubject.next(event.body);
    }
  }


  private saveFileDependsOnContext(blob: Blob, filename: string, context: ContextType): void {
    if (context === ContextType.FOLDER) {
      saveAs(blob, filename + this.ZIP_NAME_EXT);
    } else {
      saveAs(blob, filename);
    }
  }

  private openUploadDialog(): void {
    this.uploaderDialog = this.dialog.getDialogById('upload_dialog_num');
    if (!this.uploaderDialog) {
      this.uploaderDialog = this.dialog.open(UploadDialogComponent, {
        disableClose: true,
        panelClass: 'upload__dialog',
        id: 'upload_dialog_num',
        data: []
      });
    }
  }

  private openDownloadDialog(): void {
    this.downloadDialog = this.dialog.getDialogById('download_dialog_num');
    if (!this.downloadDialog) {
      this.downloadDialog = this.dialog.open(DownloadDialogComponent, {
        disableClose: true,
        panelClass: 'upload__dialog',
        id: 'download_dialog_num',
        data: []
      })
    }
  }
}
