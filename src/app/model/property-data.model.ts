import { FileDTO } from "../dto/file.dto";
import { FolderDTO } from "../dto/folder.dto";

export class PropertyData{
    public element: FolderDTO | FileDTO;
    public isOpened: boolean;

    constructor(isOpened: boolean, element?: FolderDTO | FileDTO){
        this.isOpened = isOpened;
        this.element = element;
    }
}