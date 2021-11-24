import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HistoryDTO } from "../dto/history.dto";
import { RenameHistoryDTO } from "../dto/renameHistory.dto";

const API_URL = environment.api;

@Injectable({
    providedIn: 'root'
})
export class HistoryService{
    
    constructor(private http: HttpClient){}

    public getHistoryForElement(id: number, page: number): Observable<HistoryDTO[] | RenameHistoryDTO[]>{
        let params = new HttpParams();
        params = params.append('page', page);
        return this.http.get<HistoryDTO[]>(`${API_URL}history/${id}`, {params: params});
    }
}