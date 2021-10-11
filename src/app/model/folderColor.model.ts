import { stringify } from "querystring";

export class FolderColor{
    public name: string;
    public value: string;
    public isSelected: boolean;

    constructor(name: string, value: string, isSelected: boolean){
        this.name = name;
        this.value = value;
        this.isSelected = isSelected;
    }
}