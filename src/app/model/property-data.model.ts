import { FileDTO } from "../dto/file.dto";
import { FolderDTO } from "../dto/folder.dto";

export class PropertyData{
    public element: FolderDTO | FileDTO;
    public isOpened: boolean;
    public isHistoryTabOpened: boolean;

    constructor(isOpened: boolean, isHistoryTabOpened: boolean, element?: FolderDTO | FileDTO){
        this.isOpened = isOpened;
        this.isHistoryTabOpened = isHistoryTabOpened;
        this.element = element;
    }
}