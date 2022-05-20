import {Component, HostListener, Input, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {FileDTO} from '../../../dto/file.dto';
import {FolderDTO} from '../../../dto/folder.dto';
import { FilePreviewDialogComponent } from '../../dialog/file-preview-dialog/file-preview-dialog.component';
import {ContextType} from '../../../model/enum/contextType.enum';
import { FileType } from '../../../model/enum/fileType.enum';
import { PropertyData } from '../../../model/property-data.model';
import { FileExtensionPipe } from '../../../pipe/file-extension.pipe';
import {DriveService} from '../../../service/drive.service';
import { FileService } from '../../../service/file.service';
import { FolderService } from '../../../service/folder.service';
import { PropertyService } from '../../../service/property.service';

@Component({
  selector: 'app-folder-table',
  templateUrl: './folder-table.component.html',
  styleUrls: ['./folder-table.component.scss']
})
export class FolderTableComponent implements OnInit, OnChanges {

  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
    event.preventDefault();
  }

  @ViewChild(MatMenuTrigger, {static: true}) matMenuTrigger: MatMenuTrigger;
  @Input("source") source: MatTableDataSource<FolderDTO | FileDTO>;

  public menuTopLeftPosition = {x: '0', y: '0'}
  public isSelected: boolean = false;
  public displayedColumns: string[] = ['name', 'owner', 'lastChanged', 'size'];
  public contextType = ContextType;
  public eventType: number;
  public selectedElements: any[] = [];
  public driveName: string;
  private propertyData: PropertyData;
  private folderLink: string;
  private currentPage: number = 0;

  constructor(private router: Router,
              private driveService: DriveService,
              private fileService: FileService,
              private propertyService: PropertyService,
              private activatedRouter: ActivatedRoute,
              private dialog: MatDialog,
              private folderService: FolderService) {
  }

  ngOnInit(): void {
    this.getFolderLink();
    this.getDriveName();
    this.getPropertySidenavState();
    this.updateFolders();
  }

  ngOnChanges(): void {
    if (this.source != null) {
      this.source.data.forEach(element => {
        element.isSelected = false;
      });
    }
  }

  private getFolderLink(): void{
    this.activatedRouter.url.subscribe(res => {
      if(res.length > 1){
        this.folderLink = res[1].path;
      }
    });
  }

  private getPropertySidenavState(): void{
    this.propertyService.propertySideState.subscribe(
      res=>{
        if(res != null){
          this.propertyData = res;
        }
      }
    );
  }

  private getDriveName(): void {
    this.driveService.getDrive().then(
      res => {
        this.driveName = res;
      }
    );
  }

  private updateFolders(): void {
    this.folderService.folderSubject.subscribe(
      res => {
        if (res != null) {
          this.source.data.unshift(res);
          this.source.data = this.source.data;
        }
      }
    );
  }

  private canBePreviewed(fileName: string): boolean{
    const fileExtension = new FileExtensionPipe().transform(fileName);
    const filesThatCanBePreviewd = new FileType().filesToBePreviewd();
    return filesThatCanBePreviewd.includes(fileExtension);
  }

  private previewFile(file: FileDTO){
    if(this.canBePreviewed(file.name)){
      this.dialog.open(FilePreviewDialogComponent, {
        data: file
      });
    }
  }

  public open(element: FolderDTO | FileDTO): void {
    if (element.context == ContextType.FOLDER) {
      this.router.navigateByUrl(`drive/folders/${element.link}`);
    } else {
      this.previewFile(element as FileDTO);
    }
  }

  public selectElement(element: FolderDTO | FileDTO, event: any): void {
    if (event.shiftKey && element.isSelected) {
      this.selectedElements = this.selectedElements.filter(e => e.id != element.id);
      element.isSelected = false;
    } else if (event.ctrlKey && element.isSelected) {
      element.isSelected = false;
      this.selectedElements = this.selectedElements.filter(e => e.id != element.id);
    } else if (event.ctrlKey && !element.isSelected) {
      element.isSelected = true;
      this.selectedElements.push(element);
    } else {
      this.source.data.forEach(e => {
        e.isSelected = false;
        element.isSelected = true;
      })
      this.selectedElements = [...[element]]
    }

    if(this.propertyData != null){
      this.propertyData.element = element;
    }
    this.propertyService.propertySideState.next(this.propertyData);
  }

  public openContextMenu(event: MouseEvent, element: FolderDTO | FileDTO): void {
    event.preventDefault();
    if (this.selectedElements.length == 0) {
      this.selectElement(element, event);
    }
    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';
    this.matMenuTrigger.menuData = {element: element};
    this.matMenuTrigger.openMenu();
  }

  public changeColor(folder: FolderDTO): void {
    let element = this.source.data.find(e => e.id === folder.id) as FolderDTO;
    element.color = folder.color;
  }

  public changeNoticed(element: FileDTO | FolderDTO): void {
    this.source.data.find(element => element.id === element.id).noticed = element.noticed;
  }

  public scrollDown(){
    if(!this.router.url.endsWith('my-drive')){
      this.fileService.findFilesInFolder(this.folderLink, this.currentPage.toString()).subscribe(
        res=> {
            this.source.data.push(...res);
            this.source._updateChangeSubscription();
            this.currentPage++;
        }
      );
    }
  }
}
