import { Download } from "../model/download.model";
import { IStore } from "../model/interface/store.interface";
import { DriveDTO } from "./drive.dto";
import { FolderDTO } from "./folder.dto";

export class FileDTO implements IStore{
    
    public id: number;
    public name: string;
    public createAt: Date;
    public uploadAt: Date;
    public size: number;
    public folder: FolderDTO;
    public drive: DriveDTO;
    public link: string;
    public context: string;
    public isSelected: boolean;
    public download: Download;
}