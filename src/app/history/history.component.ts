import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoryDTO } from '../dto/history.dto';
import { RenameHistoryDTO } from '../dto/renameHistory.dto';
import { StoreDTO } from '../dto/store.dto';
import { UploadHistoryDTO } from '../dto/uploadHistory.dto';
import { HistoryType } from '../model/enum/historyType.enum';
import { PropertyData } from '../model/property-data.model';
import { HistoryService } from '../service/history.service';
import { PropertyService } from '../service/property.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {

  @Input() elementId: number;
  
  public historyType = HistoryType;
  public histories: HistoryDTO[] | RenameHistoryDTO[] | any = [];
  private currentPage: number = 0;
  private isHistoryTabOpened: boolean = false;

  constructor(private historyService: HistoryService,
              private propertyService: PropertyService,
              private router: Router) { }

  ngOnInit(): void {
    this.isHistoryTabOpened = true;
    this.updateHistoryOnChange();
    this.getHistory();
  }

  private updateHistoryOnChange(){
    this.propertyService.propertySideState?.subscribe(
      res=>{
        if(res != null && res.element && res.element?.id !== this.elementId && res.isOpened && this.isHistoryTabOpened){     
          this.histories = [];
          this.currentPage = 0;     
          this.elementId = res.element.id;
          this.getHistory();
        }
      }
    );
  }

  private getHistory(): void{
    this.historyService.getHistoryForElement(this.elementId, this.currentPage).subscribe(
      res=>{
        this.histories.push(...res);
      }
    );
  }

  public goToFolder(link: string): void{
    this.router.navigateByUrl(`/drive/folders/${link}`);
  }

  public getUploadedElement(history: UploadHistoryDTO): StoreDTO {
    let element = new StoreDTO();
    Object.assign(element, history);
    return element;
  }

  public scrollDown(): void{
    this.currentPage++;
    this.getHistory();
  }

  ngOnDestroy(): void{
    this.isHistoryTabOpened = false;
    this.propertyService.propertySideState.unsubscribe
  }

}
