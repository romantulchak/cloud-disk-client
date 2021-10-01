import { ContextEnum } from "./enum/context.enum";

export class Context{
    public context: ContextEnum;
    public data: any;

    constructor(context: ContextEnum, data?: any){
        this.context = context;
        this.data = data;
    }
}