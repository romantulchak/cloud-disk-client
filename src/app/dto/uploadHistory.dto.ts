import { HistoryDTO } from "./history.dto";

export class UploadHistoryDTO extends HistoryDTO{
    public uploadedElementName: string;
    public uploadedElementLink: string;
    public uploadedElementFullPath: string;
    public cotnext: string;
}