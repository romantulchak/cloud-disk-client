import { ContextEnum } from "./enum/context.enum";

export class Context{
    public context: ContextEnum;
    public data: any;
    public url: string;

    constructor(context: ContextEnum, data?: any, url?: string){
        this.context = context;
        this.data = data;
        this.url = url;
    }
}