import { IStore } from "../model/interface/store.interface";
import { FolderDTO } from "./folder.dto";
import { LocalPath } from "./localPath.dto";
import { StoreDTO } from "./store.dto";

export class FileDTO extends StoreDTO implements IStore{
    public size: number;
    public previewPath: LocalPath;
    public folder: FolderDTO;
}
