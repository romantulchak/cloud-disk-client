import { IStore } from "../model/interface/store.interface";
import { FileDTO } from "./file.dto";
import { StoreDTO } from "./store.dto";

export class FolderDTO extends StoreDTO implements IStore{
    public subFolders?: FolderDTO[];
    public files?: FileDTO[];
    public color?: string;
}