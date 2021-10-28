export class Link{
    public name: string;
    public url: string;
    public accessType: string;

    constructor(name: string, url: string, accessType: string){
        this.name = name;
        this.url = url;
        this.accessType = accessType;
    }
}