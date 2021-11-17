export class PropertyData{
    public elementId: number;
    public isOpened: boolean;

    constructor(isOpened: boolean, elementId?: number){
        this.isOpened = isOpened;
        this.elementId = elementId;
    }
}