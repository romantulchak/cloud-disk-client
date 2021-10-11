import { HttpClient, HttpRequest } from "@angular/common/http";
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

    public downloadFolder(folderLink: string): Observable<any>{
        const req = new HttpRequest('GET', `${API_URL}folders/download-folder/${folderLink}`, {responseType: 'arrayBuffer', reportProgress: true});
        return this.http.request(req);
    }

    public preDeleteFolder(folderLink: string, driveName: string){
        return this.http.put(`${API_URL}folders/pre-remove/${folderLink}`, driveName);
    }

    public changeFolderColor(folderLink: string, color: string): Observable<FolderDTO>{
        return this.http.put<FolderDTO>(`${API_URL}folders/change-color/${folderLink}`, color);
    }

    public getRemovedElements(driveName: string): Observable<any>{
        return this.http.get(`${API_URL}folders/removed-elements/${driveName}`)
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
