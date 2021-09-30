import { DriveDTO } from "./drive.dto";

export class PlanDTO{
    public id: number;
    public name: string;
    public drives: DriveDTO[];
}