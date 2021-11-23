import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoryDTO } from '../dto/history.dto';
import { RenameHistoryDTO } from '../dto/renameHistory.dto';
import { StoreDTO } from '../dto/store.dto';
import { UploadHistoryDTO } from '../dto/uploadHistory.dto';
import { HistoryType } from '../model/enum/historyType.enum';
import { HistoryService } from '../service/history.service';
import { PropertyService } from '../service/property.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  @Input() elementId: number;
  
  public historyType = HistoryType;
  public histories: HistoryDTO[] | RenameHistoryDTO[] | any;

  constructor(private historyService: HistoryService,
              private propertyService: PropertyService,
              private router: Router) { }

  ngOnInit(): void {
    this.updateHistoryOnChange();
    this.getHistory();
  }

  private updateHistoryOnChange(){
    this.propertyService.propertySideState?.subscribe(
      res=>{
        if(res != null && res.element?.id !== this.elementId){          
          this.elementId = res.element.id;
          this.getHistory();
        }
      }
    );
  }

  private getHistory(): void{
    this.historyService.getHistoryForElement(this.elementId).subscribe(
      res=>{
        this.histories = res;
      }
    );
  }

  public goToFolder(link: string){
    this.router.navigateByUrl(`/drive/folders/${link}`);
  }

  public getUploadedElement(history: UploadHistoryDTO): StoreDTO {
    let element = new StoreDTO();
    Object.assign(element, history);
    return element;
  }

}
