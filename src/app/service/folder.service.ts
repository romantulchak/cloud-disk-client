import { HttpClient, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { FolderDTO } from "../dto/folder.dto";
import { StoreDTO } from "../dto/store.dto";

const API_URL = environment.api;

@Injectable({
    providedIn: 'root'
})
export class FolderService{

    public folderSubject: BehaviorSubject<StoreDTO> = new BehaviorSubject(null);
    public gridSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private http: HttpClient){}

    public createFolder(driveName: string, folderName: string): Observable<FolderDTO>{
        return this.http.post<FolderDTO>(`${API_URL}folder/create/${driveName}`, folderName);
    }

    public createSubFolder(folderName: string, folderLink: string): Observable<FolderDTO>{
        return this.http.post<FolderDTO>(`${API_URL}folder/create-subfolder/${folderLink}`, folderName)
    }

    public findSubFoldersInFolder(folderLink: string):Observable<FolderDTO[]>{
        return this.http.get<FolderDTO[]>(`${API_URL}folder/sub-folders/${folderLink}`);
    }

    public removeFolder(folderLink: string): Observable<void>{
       return this.http.delete<void>(`${API_URL}folder/remove/${folderLink}`);
    }

    public downloadFolder(folderLink: string): Observable<any>{
        const req = new HttpRequest('GET', `${API_URL}folder/download-folder/${folderLink}`, {responseType: 'arrayBuffer', reportProgress: true});
        return this.http.request(req);
    }

    public changeFolderColor(folderLink: string, color: string): Observable<FolderDTO>{
        return this.http.put<FolderDTO>(`${API_URL}folder/change-color/${folderLink}`, color);
    }

    public uploadInFolder(formData: FormData){
        const req = this.uploadFolderRequest(formData, 'upload');
        return this.http.request(req);
    }

    public uploadInDrive(formData: FormData){
        const req = this.uploadFolderRequest(formData, 'upload-in-drive');
        return this.http.request(req);
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


    private uploadFolderRequest(formData: FormData, endPoint: string): HttpRequest<FormData>{
        return new HttpRequest('POST', `${API_URL}folder/${endPoint}`, formData, {
            reportProgress: true,
            responseType: 'json',
        });
    }
}
