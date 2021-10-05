import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { FolderDTO } from "../dto/folder.dto";
import { IStore } from "../model/interface/store.interface";

const API_URL = environment.api;

@Injectable({
    providedIn: 'root'
})
export class FolderService{

    public folderSubject: BehaviorSubject<any> = new BehaviorSubject(null);
    public gridSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private http: HttpClient){}

    public createFolder(driveName: string, folderName: string): Observable<FolderDTO>{
        return this.http.post<FolderDTO>(`${API_URL}folders/create/${driveName}`, folderName);
    }

    public findAllElementsForDrive(driveName: string): Observable<any>{
        return this.http.get<IStore>(`${API_URL}folders/${driveName}`);
    }

    public createSubFolder(folderName: string, folderLink: string): Observable<FolderDTO>{
        return this.http.post<FolderDTO>(`${API_URL}folders/create-subfolder/${folderLink}`, folderName)
    }

    public findSubFoldersInFolder(folderLink: string):Observable<FolderDTO[]>{
        return this.http.get<FolderDTO[]>(`${API_URL}folders/sub-folders/${folderLink}`);
    }

    public removeFolder(folderLink: string): Observable<any>{
       return this.http.delete<any>(`${API_URL}folders/remove/${folderLink}`);
    }

    private saveGridStyle(style: string): string{
        localStorage.setItem('gridStyle', style);
        return style;
    }

    public getGridStyle(){
        let gridStyle = localStorage.getItem('gridStyle');
        if(gridStyle == null){
           gridStyle =  this.saveGridStyle('LIST');
        }
        this.gridSubject.next(true);
        return gridStyle;
    }
}
