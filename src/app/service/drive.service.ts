import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DriveDTO } from "../dto/drive.dto";

const API_URL = environment.api;

@Injectable({
    providedIn: 'root'
})
export class DriveService{

    constructor(private http: HttpClient){

    }

    private getUserDrive(): Observable<DriveDTO>{
        return this.http.get<DriveDTO>(`${API_URL}my-drive`);
    }

    private storeDrive(drive: string){
        localStorage.setItem('drive', drive);
    }

    public async getDrive(): Promise<string>{
        let drive = localStorage.getItem('drive');
        if(drive == null){
           drive = (await this.getUserDrive().toPromise()).name;
           this.storeDrive(drive);
        }
        return new Promise(resolve =>{
            resolve(drive);
        });
    }

}