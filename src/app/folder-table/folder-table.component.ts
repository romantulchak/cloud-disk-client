import {Component, HostListener, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {FileDTO} from '../dto/file.dto';
import {FolderDTO} from '../dto/folder.dto';
import {ContextType} from '../model/enum/contextType.enum';
import { DriveService } from '../service/drive.service';

@Component({
  selector: 'app-folder-table',
  templateUrl: './folder-table.component.html',
  styleUrls: ['./folder-table.component.scss']
})
export class FolderTableComponent implements OnInit, OnChanges {
  constructor(private router: Router,
              private driveService: DriveService) {
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
  public eventType: number;
  public selectedElements: any[] = [];
  public driveName: string;

  @Input("source") source: MatTableDataSource<FolderDTO | FileDTO>;

  ngOnInit(): void {
    this.getDriveName();
  }

  ngOnChanges() {
    if (this.source != null) {
      this.source.data.forEach(element => {
        element.isSelected = false;
      });
      
    }
  }

  private getDriveName(){
    this.driveService.getDrive().then(
      res=>{
        this.driveName = res;
      }
    );
  }

  public open(element: any) {
    if (element.context == "FOLDER") {
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

  public changeColor(folder: FolderDTO){
    let element = this.source.data.find(element => element.id === folder.id) as FolderDTO;
    element.color = folder.color;
  }

  public changeNoticed(element: FileDTO | FolderDTO){
    console.log(element);
    
    this.source.data.find(element => element.id === element.id).noticed = element.noticed;
  }
}
