import {Component, Input, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {EventEmitter} from '@angular/core';
import {FileDTO} from '../dto/file.dto';
import {FolderDTO} from '../dto/folder.dto';
import {StoreDTO} from '../dto/store.dto';
import {Download} from '../model/download.model';
import {ContextEnum} from '../model/enum/context.enum';
import {ContextType} from '../model/enum/contextType.enum';
import {FolderColorType} from '../model/enum/folderColorType.enum';
import {FolderColor} from '../model/folderColor.model';
import {DriveService} from '../service/drive.service';
import {FolderService} from '../service/folder.service';
import {FunctionService} from '../service/function.service';
import {NoticedService} from '../service/noticed.service';
import {MatDialog} from '@angular/material/dialog';
import {AccessDialogComponent} from '../access-dialog/access-dialog.component';
import {AccessType} from '../model/enum/accessType.enum';
import {ElementService} from '../service/element.service';
import {RenameDialogComponent} from '../rename-dialog/rename-dialog.component';
import { HistoryService } from '../service/history.service';
import { PropertyService } from '../service/property.service';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {

  @Input('selectedElements') selectedElements: StoreDTO[];
  @Input('driveName') driveName: string;
  @Input('source') source: MatTableDataSource<FolderDTO | FileDTO>;
  @Input('element') element: FolderDTO;
  @Output('changeColor') changeColorEvent: EventEmitter<FolderDTO> = new EventEmitter();

  public context: string;
  public pageContext: string;
  public contextType = ContextType;
  public pageContextType = ContextEnum;
  public selectedColor: FolderColor;
  public colors: FolderColor[] = [];
  public accessType = AccessType;
  private filesCount: number = 0;
  private folderCount: number = 0;

  constructor(private functionService: FunctionService,
              private driveService: DriveService,
              private folderService: FolderService,
              private noticeService: NoticedService,
              private propertyService: PropertyService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getFilesContext();
    this.getPageContext();
  }

  public getColors(): void {
    if (this.colors.length === 0) {
      Object.entries(FolderColorType).forEach(element => {
        let name = element[0].replace(/_/g, ' ').toLocaleLowerCase();
        let isSelected = this.element.color === element[1];
        let folderColor = new FolderColor(name, element[1], isSelected);
        if (isSelected) {
          this.selectedColor = folderColor;
        }
        this.colors.push(folderColor);
      });
    }
  }

  private getPageContext(): void {
    this.driveService.contextSubject.subscribe(
      res => {
        this.pageContext = res.context;
      }
    );
  }

  private getFilesContext(): void {
    this.selectedElements.forEach(element => {
      if (element.context === this.contextType.FILE) {
        this.filesCount++;
      } else {
        this.folderCount++;
      }
    });
    if (this.selectedElements.length === this.filesCount && this.folderCount === 0 || this.selectedElements.length === this.folderCount && this.filesCount === 0) {
      this.context = this.selectedElements[0].context;
    } else {
      this.context = this.contextType.ANY;
    }
  }

  public download(): void {
    let downloadProgress: Download[] = [];
    this.selectedElements.forEach(element => {
      let download = new Download(0, false, element);
      downloadProgress.push(download);
    });
    this.functionService.download(downloadProgress);
  }

  public preRemove(): void {
    this.functionService.preRemove(this.selectedElements, this.driveName, this.source);
  }

  public fullRemove(): void {
    this.functionService.fullRemove(this.selectedElements, this.source);
  }

  public restore(): void {
    this.functionService.restore(this.selectedElements, this.source);
  }

  public changeColor(color: FolderColor): void {
    this.selectedElements.forEach(element => {
      this.folderService.changeFolderColor(element.link, color.value).subscribe(
        res => {
          color.isSelected = true;
          this.selectedColor = color;
          this.element = res;
          this.changeColorEvent.emit(res);
        }
      );
    });
  }

  public addToNoticed(): void {
    this.selectedElements = this.selectedElements.filter(element => !element.noticed);
    this.selectedElements.forEach(element => {
      this.noticeService.addElementToNoticed(element.link).subscribe(
        () => {
          element.noticed = true;
        }
      );
    })
  }

  public removeFromStarred(): void {
    this.selectedElements.forEach(element => {
      this.noticeService.removeFromStarred(element.link).subscribe(
        () => {
          element.noticed = false;
          if (this.pageContext === ContextEnum.NOTICED) {
            this.source.data = this.source.data.filter(e => e.id !== element.id);
          }
        }
      );
    });
  }

  public getProperties(){
    this.propertyService.open(this.element.id);
  }

  public checkNoticedElements(): boolean {
    let noticed = this.selectedElements.filter(element => element.noticed);
    return this.selectedElements.length === noticed.length;
  }

  public openAccessDialog() {
    this.dialog.open(AccessDialogComponent, {
      data: this.element
    });
  }

  public openRenameDialog() {
    this.dialog.open(RenameDialogComponent, {
      data: this.element,
      panelClass: 'folder__file_container'
    })
  }
}
