import { StoreDTO } from "./store.dto";
import { UserDTO } from "./user.dto";

export class HistoryDTO{
    public id: number;
    public element: StoreDTO;
    public type: string;
    public user: UserDTO;
    public date: Date;
}