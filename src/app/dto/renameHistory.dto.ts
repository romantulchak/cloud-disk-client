import { HistoryDTO } from "./history.dto";

export class RenameHistoryDTO extends HistoryDTO {
    public name: string;
    public oldName: string;
}