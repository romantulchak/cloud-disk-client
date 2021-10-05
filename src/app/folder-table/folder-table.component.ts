import {Component, HostListener, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {FileDTO} from '../dto/file.dto';
import {FolderDTO} from '../dto/folder.dto';
import {ContextType} from '../model/enum/contextType.enum';
import {SizeType} from '../model/enum/sizeType.enum';
import {FileService} from '../service/file.service';
import {FolderService} from '../service/folder.service';

@Component({
  selector: 'app-folder-table',
  templateUrl: './folder-table.component.html',
  styleUrls: ['./folder-table.component.scss']
})
export class FolderTableComponent implements OnInit, OnChanges {
  constructor(private router: Router,
              private folderService: FolderService,
              private fileService: FileService) {
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
    event.preventDefault();
  }

  @ViewChild(MatMenuTrigger, {static: true}) matMenuTrigger: MatMenuTrigger;

  public menuTopLeftPosition = {x: '0', y: '0'}
  public isSelected: boolean = false;
  public displayedColumns: string[] = ['name', 'owner', 'lastChanged', 'size'];
  public contextType = ContextType;
  private selectedElements: any[] = [];


  @Input("source") source: MatTableDataSource<FolderDTO | FileDTO>;

  ngOnInit(): void {

  }

  ngOnChanges() {
    if (this.source != null) {
      this.source.data.forEach(element => {
        element.isSelected = false;
      });
    }
  }

  public open(element: any) {
    if (element.context == "FOLDER") {
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigateByUrl(`drive/folders/${element.link}`);
    } else {
      console.log('FILE');

    }
  }

  public selectElement(element: FolderDTO | FileDTO, event: any, index: number) {
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
  }

  public openContextMenu(event: MouseEvent, element: FolderDTO | FileDTO, index: number) {
    event.preventDefault();
    if (this.selectedElements.length == 0) {
      this.selectElement(element, event, index);
    }
    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';
    this.matMenuTrigger.menuData = {element: element};
    this.matMenuTrigger.openMenu();
  }

  public removeFile(element: FileDTO) {
    this.fileService.deleteFile(element.link).subscribe(
      res => {
        this.source.data = this.source.data.filter(f => f.id !== element.id);
      }
    );
  }

  private removeFolder(element: FolderDTO) {
    this.folderService.removeFolder(element.link).subscribe(
      res => {
        this.source.data = this.source.data.filter(f => f.id !== element.id);
      }
    );
  }

  public remove() {
    this.selectedElements.forEach(element => {
      if (element.context == this.contextType.FOLDER) {
        this.removeFolder(element);
      } else {
        this.removeFile(element);
      }
    });
    this.selectedElements = [];
  }

  public getSize(size: number): string {
    if (size > SizeType.B_MIN && size < SizeType.B_MAX) {
      return this.convertBytes(size, SizeType.B_MIN) + " B";
    } else if (size > SizeType.KB_MIN && size < SizeType.KB_MAX) {
      return this.convertBytes(size, SizeType.KB_MIN) + " KB";
    } else if (size > SizeType.MB_MIN && size < SizeType.MB_MAX) {
      return this.convertBytes(size, SizeType.MB_MIN) + " MB";
    } else if (size > SizeType.GB_MIN && size < SizeType.GB_MAX) {
      return this.convertBytes(size, SizeType.GB_MIN) + " GB";
    }
    return "";
  }

  private convertBytes(size: number, divied: number): string {
    return (size / divied).toPrecision(3);
  }
}
