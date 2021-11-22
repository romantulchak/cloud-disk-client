import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { HistoryDTO } from '../dto/history.dto';
import { RenameHistoryDTO } from '../dto/renameHistory.dto';
import { StoreDTO } from '../dto/store.dto';
import { UploadHistoryDTO } from '../dto/uploadHistory.dto';
import { HistoryType } from '../model/enum/historyType.enum';
import { HistoryService } from '../service/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnChanges {

  @Input() elementId: number;
  
  public historyType = HistoryType;
  public histories: HistoryDTO[] | RenameHistoryDTO[] | any;

  constructor(private historyService: HistoryService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void{
    if(this.elementId !== null){
      this.getHistory();
    }
  }


  private getHistory(): void{
    this.historyService.getHistoryForElement(this.elementId).subscribe(
      res=>{
        this.histories = res;
      }
    );
  }

  public getUploadElement(history: UploadHistoryDTO): StoreDTO {
    let element = new StoreDTO();
    Object.assign(element, history);
    return element;
  }

}
